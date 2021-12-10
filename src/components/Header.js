import React from "react";
import covid19logo from "../images/covid-19logo.gif";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

export default function Header({ title }) {
  return (
    <header>
      <img src={covid19logo} alt="Second Covid 19"></img>

      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link>
            <Link to="/">Home</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to="/about">About</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to="/info">Pandemic Resources & Information</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to="/contact">Contact us</Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </header>
  );
}
