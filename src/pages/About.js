import React from "react";
import "../App.css";
import Header from "../components/Header";


function About() {

  return (

    <div id="about_page" >
      <Header />
      <h1>About this application</h1>
      <p>Hello! Welcome to Covid-19 Tracker! The application is develped by Quentin, Subash and Zoe. This Covid-19 Tracker application built using React, uses data from CovidActNow as the data source.
        The app displays key metrics around the growth of coronavirus, including the total number of population State and total number of population Country, new cases, new deaths, CDC Transmission Level, Risk Levels, and Test Positivity Ratio.
        It displays data for  the US, including all the states and territories and worldwide stats.
        Also displays chart in terms of Risk Level, Infection Rate, Compare death ration and Infection  </p><br />
    </div>
  );
}

export default About;
