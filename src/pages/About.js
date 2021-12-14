import React from "react";
import "../App.css";
import Header from "../components/Header";
import { Carousel, Jumbotron, Container, Row, Col, Button } from 'react-bootstrap'
import Zoe from '../images/faces/zoe.jpg'
import Quen from '../images/faces/quen.jpg'
import Subash from '../images/faces/subash.png'

function About() {
  return (
    <div id="about_page" class="App">
      <Header />
      <Container style={{ height: "auto", width: "100vw", margin: "0, 2vw, 0, 2vw" }}>
       
            <Jumbotron className="" style={{ backgroundColor: "#f1faee" }}>
              <h1>About the Covid-19 Tracker</h1>
              {/* <div className="about-text"> */}
              <p className="about-content" className="m-3">
                The application is develped by <strong>Quentin</strong>, <strong>Subash</strong>, and <strong>Zoe</strong>.
              </p>
              <Button variant="primary" className="mb-2" href="https://github.com/ZOE-SUBASH-QUEN">View Code</Button>
              <p>
                This Covid-19 Tracker application built using
                React, data from CovidActNow as the data source.
                The app displays
                key metrics around the growth of coronavirus, including the total number
                of population State and total number of Population, Country, new cases,
                New Deaths, CDC Transmission Level, Risk Levels, and Test Positivity
                Ratio. It displays data for the US, including all the states and
                territories and worldwide stats. Also displays chart in terms of Risk
                Level, Infection Rate, Compare death ration and Infection{" "}

              </p>
            </Jumbotron>
          
            <Carousel style={{ marginTop: "10vh" }}>
              <Carousel.Item>
              <div style={{height:"900px", maxHeight:"900px"}}>
                <img
                  className="w-50"
                  src={Zoe}
                  alt="First slide"
                />
                
                <Carousel.Caption style={{ position: "relative", left: "auto", right: "auto" , color:"#457b9d"}}>
                  <h3 style={{ color: "#1d3557" }}>Zoe Ji</h3>
                  <p>SDE Apprentice. Mom. Foodie.</p>
                </Carousel.Caption>
                </div>
              </Carousel.Item>
              <Carousel.Item>
              <div style={{height:"900px", maxHeight:"900px"}}>
                <img
                  className="w-50"
                  src={Subash}
                  alt="First slide"
                />
                

                <Carousel.Caption style={{ position: "relative", left: "auto", right: "auto", color:"#457b9d"}}>
                  <h3 style={{ color: "#1d3557" }}>Subash KC</h3>
                  <p>SDE Apprentice.</p>
                </Carousel.Caption>
                </div>
              </Carousel.Item>
              <Carousel.Item>
              <div style={{height:"900px", maxHeight:"900px"}}>
                <img
                  className="w-50"
                  src={Quen}
                  alt="First slide"
                />
                

                <Carousel.Caption style={{ position: "relative", left: "auto", right: "auto", color:"#457b9d" }}>
                  <h3 style={{ color: "#1d3557" }}>Quentin Young</h3>
                  <p>SDE Apprentice. Farmer. Runner.</p>
                </Carousel.Caption>
                </div>
              </Carousel.Item>

            </Carousel>
      </Container>
    </div>
  );
}

export default About;
