// import React from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHeart,
//   faUser,
//   faImage,
//   faPoo,
// } from "@fortawesome/free-solid-svg-icons";
// const FullPageSkeleton = () => {
//   return (
//     <div style={styles.container}>
//       <div style={styles.iconContainer}>
//         {/* Nhiều icon xoay khác nhau */}
//         <FontAwesomeIcon icon={faHeart} style={styles.spinner} />
//         <FontAwesomeIcon icon={faUser} style={styles.spinner} />
//         <FontAwesomeIcon icon={faImage} style={styles.spinner} />
//         <FontAwesomeIcon icon={faPoo} style={styles.spinner} />
//       </div>
//       <div style={styles.skeletonContainer}>
//         <Skeleton height={40} count={3} />
//         <Skeleton height={200} style={{ marginTop: 20 }} />
//         <Skeleton height={200} style={{ marginTop: 20 }} />
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     width: "100vw",
//     backgroundColor: "#f0f0f0",
//     position: "fixed",
//     top: 0,
//     left: 0,
//     zIndex: 9999,
//   },
//   iconContainer: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "15px",
//     marginBottom: 20,
//   },
//   spinner: {
//     fontSize: "2.5rem",
//     color: "#4b9fea",
//     animation: "spin 1.5s linear infinite",
//   },
//   skeletonContainer: {
//     width: "90%",
//     maxWidth: "800px",
//   },
// };

// export default FullPageSkeleton;
