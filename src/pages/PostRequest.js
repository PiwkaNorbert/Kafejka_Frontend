// import { useState } from "react";
// import axios from "axios";
// const url = "";

// const PostRequest = () => {
//   const [name, setName] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const resp = await axios.get(
//         "http://192.168.15.115:8000/block-pc/{:id}",
//         { name: name }
//       );
//       console.log(resp.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <section>
//       <h2 className="text-center">post request</h2>
//       <form className="form">
//         <div className="form-row">
//           <label htmlFor="name" className="form-label">
//             name
//           </label>
//           <input
//             type="text"
//             className="form-input"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <button type="submit" className="btn btn-block" onClick={handleSubmit({e.target.pk})}>
//           register
//         </button>
//       </form>
//     </section>
//   );
// };
// export default PostRequest;
// export const  str;
