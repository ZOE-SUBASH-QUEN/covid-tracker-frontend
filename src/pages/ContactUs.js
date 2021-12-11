import React from "react";
import "../App.css";
import { Form } from "react-bootstrap";


function ContactUs() {

  return (


    <Form id="contact-form">
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Did You Get the Coronavirus Vaccine, or Are You Planning To?</Form.Label>
        <Form.Control as="select">
          <option>Please select</option>
          <option>Yes</option>
          <option>No</option>
          <option>I'll get vaccined soon. </option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect2">

      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>

  );
}

export default ContactUs;
