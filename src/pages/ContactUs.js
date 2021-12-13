import Header from "../components/Header";
const ContactUs = () =>{
  
  return (
    
  <div className="container border"
  style={{marginTop:"5px",
  width:"50%",
  }}>
    <Header />
    <h1 style={{marginTop:"10%", marginLeft: "30%"}}>Contact Us</h1>
    <form className="row" style={{margin:"25px 85px 75px 100px"}}>
     <label>Your Name:</label>
     <input type="text" name="name" className="form-control" />

     <label>Your Email:</label>
     <input type="email" name="user_email" className="form-control" />

     <label>Message:</label>
     <textarea name="message" rows="4" className="form-control" />
     <input type="Submit" value="Send" className="form-control btn btn-primary" style={{marginTop: "30px"}}/>
    </form>
  </div>
  );
};

export default ContactUs;