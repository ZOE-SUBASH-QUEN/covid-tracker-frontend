import React from "react";
import covid19logo from "../images/covid-19logo.gif";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Component } from "react";
import LoginButton from './LoginButton';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';


export default function Header( { handleSetUsersFavorites }) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const title = `COVID-19 Tracker`;
  return (
    <header>
      <div className="top-header">
      <img className="header-image"
        src={covid19logo}
        alt="Second Covid 19">
      </img>
    </div>


      <Nav className="justify-content-center mainHeaderNav" activeKey="/home">
        <Nav.Item >
          <Nav.Link className="nav-item" href="/">Home</Nav.Link>


        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-item" href="/about">About</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-item" href="/info">Pandemic Resources & Information</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-item" href="/contactus">Contact Us</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>{isAuthenticated? <LogoutButton handleSetUsersFavorites={handleSetUsersFavorites} /> : <LoginButton />}</Nav.Link>
        </Nav.Item>  
      </Nav>

      
      

    </header>
  )

}
