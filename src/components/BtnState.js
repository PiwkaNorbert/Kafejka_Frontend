// import React, { useState, useEffect } from "react";

// const ComputerStatusList = () => {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [computers, setComputer] = useState([]);
//   useEffect(() => {
//     getComputers();
//   }, []);
//   const getComputers = async () => {
//     fetch("http://192.168.15.115:8000/komps/")
//       .then((response) => response.json())
//       .then(
//         (data) => {
//           setIsLoaded(true);
//           console.log(data);
//           setComputer(data);
//         },
//         (error) => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       );
//   };
//   if (error) return <div>Error: {error.message}</div>;
//   else if (!isLoaded) return <div>Loading...</div>;
//   else {
//     return (
//       <div>
//         <div className="computer-list">
//           {computers.map((computer, index) => (
//             <h3 key={index}>
//               Filia: {computer.fields.filia}
//               <br />
//               <p className="statusKomp">
//                 Status komputera: {computer.fields.f}
//               </p>
//             </h3>
//           ))}
//         </div>
//       </div>
//     );
//   }
// };

// export default ComputerStatusList;
