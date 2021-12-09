import React from 'react'
import covid19logo from "../images/covid-19logo.gif";
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import { Component} from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';



export default function Header({title}) {
    return (
        <header>
        <img
            src={covid19logo}
            alt="Second Covid 19">
        </img>

        <Nav className="justify-content-center" activeKey="/home">
    <Nav.Item>
      <Nav.Link href="/">Home</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/about">About</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/info">Pandemic Resources & Information</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/contactUs">Contact us</Nav.Link>
    </Nav.Item>
  </Nav>

            </header>
    )
}
