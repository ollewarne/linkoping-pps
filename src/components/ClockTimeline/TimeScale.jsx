export default function TimeScale() {
  const dayStart = 6;
  const dayEnd = 18;
  const totalHours = dayEnd - dayStart;

  return (
    <>
      {Array.from({ length: totalHours + 1 }).map((_, i) => {
        const hour = dayStart + i;
        const top = (i / totalHours) * 100;

        return (
          <div
            key={hour}
            style={{
              position: "absolute",
              top: `${top}%`,
              left: "0px",
              transform: "translateY(-50%)",
              fontSize: "10px",
              color: "#aaa",
            }}
          >
            {hour.toString().padStart(2, "0")}:00
          </div>
        );
      })}
    </>
  );
}
