// import { useMemo } from "react";
// import { hhmmToMinutes, calculateDuration } from "../../utils/validateTime.js";

// export default function ActivityHoursTimeline({ blocks = [] }) {
//   const dayStart = 6 * 60;
//   const dayEnd = 18 * 60;
//   const dayTotal = dayEnd - dayStart;

//   const timeBlocks = useMemo(() => {
//     return blocks
//       .map((block) => {
//         if (!block?.start || !block?.end) return null;

//         const startMin = hhmmToMinutes(block.start);
//         const duration = calculateDuration(block.start, block.end);

//         if (startMin === null || duration === null) return null;
//         if (duration <= 0) return null;

//         const top = ((startMin - dayStart) / dayTotal) * 100;
//         const height = (duration / dayTotal) * 100;

//         return {
//           top: Math.max(0, Math.min(100, top)),
//           height: Math.max(0, Math.min(100, height)),
//         };
//       })
//       .filter(Boolean);
//   }, [blocks, dayStart, dayTotal]);

//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: 0,
//         bottom: 0,
//         left: "76px",
//         width: "12px",
//         borderRadius: "8px",
//         overflow: "hidden",
//       }}
//     >
//       {timeBlocks.map((b, i) => (
//         <div
//           key={i}
//           style={{
//             position: "absolute",
//             top: `${b.top}%`,
//             height: `${b.height}%`,
//             width: "100%",
//             backgroundColor: "#D3D3D3",
//             opacity: 0.9,
//           }}
//         />
//       ))}
//     </div>
//   );
// }