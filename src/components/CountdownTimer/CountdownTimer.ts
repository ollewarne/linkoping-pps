interface SessionOptions {
  id: string;
  totalMinutes: number;
  activeMinutes: number;
  breakMinutes: number;
  onTick?: (
    id: string,
    totalSecondsLeft: number,
    currentPhase: "work" | "break",
    phaseSecondsLeft: number
  ) => void;
  onPause?: (id: string, totalSecondsLeft: number, phase: "work" | "break") => void;
  onComplete?: (id: string) => void;
  showPausePopup?: () => void;
}

export class SessionTimer {
  private id: string;
  private totalSecondsLeft: number;
  private activeSeconds: number;
  private breakSeconds: number;
  private phase: "work" | "break" = "work";
  private phaseSecondsLeft: number;
  private interval: ReturnType<typeof setInterval> | null = null;
  private onPause?: SessionOptions["onPause"];
  private showPausePopup?: SessionOptions["showPausePopup"];
  private onTick?: SessionOptions["onTick"];
  private onComplete?: SessionOptions["onComplete"];

  constructor(options: SessionOptions) {
    this.id = options.id;
    this.totalSecondsLeft = options.totalMinutes * 60;
    this.activeSeconds = options.activeMinutes * 60;
    this.breakSeconds = options.breakMinutes * 60;
    this.phaseSecondsLeft = this.activeSeconds;
    this.onPause = options.onPause;
    this.showPausePopup = options.showPausePopup;
    this.onTick = options.onTick;
    this.onComplete = options.onComplete;
  }

  start() {
    if (this.interval !== null) return; 

    this.interval = setInterval(() => {
      if (this.totalSecondsLeft <= 0) {
        this.stop();
        return;
      }

      this.totalSecondsLeft -= 1;
      this.phaseSecondsLeft -= 1;

      this.onTick?.(
        this.id,
        this.totalSecondsLeft,
        this.phase,
        this.phaseSecondsLeft
      );

      if (this.phaseSecondsLeft <= 0) {
        if (this.phase === "work") {
            this.showPausePopup?.();
          this.phase = "break";
          this.phaseSecondsLeft =
            Math.min(this.breakSeconds, this.totalSecondsLeft);
        } else {
          this.phase = "work";
          this.phaseSecondsLeft =
          Math.min(this.activeSeconds, this.totalSecondsLeft);
        }
      }
    }, 1000);
  }

  pause() {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
      this.onPause?.(this.id, this.totalSecondsLeft, this.phase);
    }
  }

  resume() {
    this.start();
  }

  reset(toTotalMinutes?: number) {
    this.pause();
    if (toTotalMinutes !== undefined) this.totalSecondsLeft = toTotalMinutes * 60;
    this.phase = "work";
    this.phaseSecondsLeft = this.activeSeconds;
  }

  private stop() {
  if ( this.interval !== null){
    clearInterval(this.interval);
    this.interval = null;
  }

  this.onComplete?.(this.id);
  this.showPausePopup?.();
  }

  get isRunning() {
    return this.interval !== null;
  }
}
