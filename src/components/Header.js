import React from 'react'
import covid19logo from "../images/covid-19logo.gif";
import { Nav} from "react-bootstrap";


export default function Header({title}) {
    return (
        <header>

        
        <img
            src={covid19logo}
            alt="Second Covid 19">
        </img>

        <Nav className="justify-content-center" activeKey="/home">
    <Nav.Item>
      <Nav.Link href="/home">Home</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-1">About</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-2">Pandemic Resources & Information</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-3">Contact us</Nav.Link>
    </Nav.Item>
  </Nav>

            </header>
    )
}
