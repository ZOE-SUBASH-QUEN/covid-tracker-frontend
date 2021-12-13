import Header from "../components/Header";
import emailjs from "emailjs-com";
import React, {useState} from "react";

const Result =()=>{
  return(
    <p>Your message has been successfully sent. We will contact you soon!</p>
  )

}

function ContactUs(props) {
  const [result, showResult] = useState(false);
  const sendEmail=(e)=> {
    e.preventDefault();

    emailjs.sendForm("service_qvr3vez", "template_r2pnwxr", e.target, "user_7eLFTKfHQuV77dMiZJCe4")
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
      showResult(true);
  };
  return (
    
  <div className="container border"
  style={{marginTop:"5px",
  width:"50%",
  }}>
    <Header />
    <h1 style={{marginTop:"10%", marginLeft: "30%"}}>Contact Us</h1>
    <form onSubmit={sendEmail} className="row" style={{margin:"25px 85px 75px 100px"}}>
     <label>Your Name:</label>
     <input type="text" name="name" className="form-control" />

     <label>Your Email:</label>
     <input type="email" name="user_email" className="form-control" />

     <label>Message:</label>
     <textarea name="message" rows="4" className="form-control" />
     <input type="Submit" value="Send" className="form-control btn btn-primary" style={{marginTop: "30px"}}/>
    <div className="row">{result ? <Result/> : null}</div>
    </form>
  </div>
  );
};

export default ContactUs;