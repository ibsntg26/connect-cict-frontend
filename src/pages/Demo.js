import axios from "axios";
import React from 'react'

const Demo = () => {
  return (
    <div>Demo</div>
  )
}

export default Demo

// import React, { useState, useEffect } from "react";

// import axios from "axios";

// const Demo = () => {
//   const [formData, updateFormData] = useState({
//     student_id: "6270fb3655c8b0f3c8215a0f",
//     report_type: "",
//     type_others: "",
//     message: "",
//     attachment: null,
//     details: "",
//   });

//   const changeHandler = (e) => {
//     if (e.target.name == "attachment") {
//       updateFormData({
//         ...formData,
//         [e.target.name]: e.target.files[0],
//       });
//     } else {
//       updateFormData({
//         ...formData,
//         [e.target.name]: e.target.value,
//       });
//     }
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     console.log(formData);

//     axios
//       .post(
//         `http://127.0.0.1:8000/api/incident/`,
//         {
//           student_id: formData.student_id,
//           report_type: formData.report_type,
//           type_others: formData.type_others,
//           message: formData.message,
//           details: formData.details,
//           attachment: formData.attachment,
//         },
//         { headers: { "Content-Type": "multipart/form-data" } }
//       )
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.log(err.response.data);
//       });
//   };

//   return (
//     <form onSubmit={submitHandler}>
//       <label htmlFor="type">Report type</label>
//       <select name="report_type" id="type" onChange={changeHandler}>
//         <option value="Remaining Balance">Remaining Balance</option>
//         <option value="Failed a subject">Failed a subject</option>
//         <option value="Adding/Changing">Adding/Changing</option>
//         <option value="Others">Others</option>
//       </select>

//       <label htmlFor="others">Others type</label>
//       <input
//         type="text"
//         name="type_others"
//         id="others"
//         onChange={changeHandler}
//       />

//       <label htmlFor="message">Message</label>
//       <textarea
//         name="message"
//         id="message"
//         cols="30"
//         rows="10"
//         onChange={changeHandler}
//       ></textarea>

//       <label htmlFor="details">Details</label>
//       <input type="text" id="details" name="details" onChange={changeHandler} />

//       <label htmlFor="file">Upload</label>
//       <input type="file" name="attachment" id="file" onChange={changeHandler} />

//       <input type="submit" value="Send" />
//     </form>
//   );
// };

// export default Demo;
