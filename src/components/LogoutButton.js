import React from "react";
import { useEffect } from "react";
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LogoutButton = ({handleSetUsersFavorites}) => {
  const { logout, user } = useAuth0();
  
  useEffect(() => {
    createUserInDbIfNeeded()
  }, [])

  const createUserInDbIfNeeded = async() =>{
    try{
        await axios.get(`http://localhost:3001/user/${user?.email}`).then(result => {
        console.log("result from db",result)  
        handleSetUsersFavorites(result.data[0])
        });
      
    } catch(e){
        console.log(e)
    }
}

  return (
    <Button variant="outline-danger" onClick={() => logout({ returnTo: window.location.origin })} style={{position:"relative",left:"25%"}}>
      Log Out
    </Button>
  );
};

export default LogoutButton;