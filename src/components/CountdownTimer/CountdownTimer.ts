interface SessionOptions {
  id: string;
  initialPhaseSeconds?: number;
  initialPhase?: "work" | "break";
  totalSeconds: number;
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
    this.totalSecondsLeft = options.totalSeconds;
    this.activeSeconds = options.activeMinutes * 60;
    this.breakSeconds = options.breakMinutes * 60;
    const phaseTotal = (options.initialPhase ?? "work") === "work" ? this.activeSeconds : this.breakSeconds;
    this.phase = options.initialPhase ?? "work";
    this.phaseSecondsLeft = options.initialPhaseSeconds !== undefined 
        ? Math.min(phaseTotal - options.initialPhaseSeconds, this.totalSecondsLeft)
        : Math.min(phaseTotal, this.totalSecondsLeft);
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
              if (this.totalSecondsLeft <= this.breakSeconds) {
                  this.phaseSecondsLeft = this.totalSecondsLeft;
              } else {
                  this.showPausePopup?.();
                  this.phase = "break";
                  this.phaseSecondsLeft = this.breakSeconds;
              }
          } else {
              this.phase = "work";
              this.phaseSecondsLeft = Math.min(this.activeSeconds, this.totalSecondsLeft);
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

  reset(toTotalSeconds?: number) {
    this.pause();
    if (toTotalSeconds !== undefined) this.totalSecondsLeft = toTotalSeconds;
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
