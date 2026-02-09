// import { useEffect, useMemo, useState } from "react";
// import { getWorkdayFromStorage } from "../../utils/workdayStorage.js";
// import { hhmmToMinutes, calculateDuration } from "../../utils/validateTime.js";

// export default function WorkingHoursTimeline() {
//   const [workday, setWorkday] = useState(getWorkdayFromStorage());

//   useEffect(() => {
//     function onWorkdayUpdate() {
//       setWorkday(getWorkdayFromStorage());
//     }

//     window.addEventListener("workdayDataUpdated", onWorkdayUpdate);
//     return () => window.removeEventListener("workdayDataUpdated", onWorkdayUpdate);
//   }, []);

//   const dayStart = 6 * 60;
//   const dayEnd = 18 * 60;
//   const dayTotal = dayEnd - dayStart;

//   const workBlock = useMemo(() => {
//     const startStr = workday?.workHours?.start;
//     const endStr = workday?.workHours?.end;

//     if (!startStr || !endStr) return null;

//     const startMin = hhmmToMinutes(startStr);
//     const duration = calculateDuration(startStr, endStr);

//     if (startMin === null || duration === null) return null;
//     if (duration <= 0) return null;

//     const top = ((startMin - dayStart) / dayTotal) * 100;
//     const height = (duration / dayTotal) * 100;

//     return {
//       top: Math.max(0, Math.min(100, top)),
//       height: Math.max(0, Math.min(100, height)),
//     };
//   }, [workday, dayStart, dayTotal]);

//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: 0,
//         bottom: 0,
//         left: "60px",
//         width: "12px",
//         borderRadius: "8px",
//         overflow: "hidden",
//       }}
//     >
//       {workBlock && (
//         <div
//           style={{
//             position: "absolute",
//             top: `${workBlock.top}%`,
//             height: `${workBlock.height}%`,
//             width: "100%",
//             backgroundColor: "#ff66aa",
//             opacity: 0.7,
//           }}
//         />
//       )}
//     </div>
//   );
// }