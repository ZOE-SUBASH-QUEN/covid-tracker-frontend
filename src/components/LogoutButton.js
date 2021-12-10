import React from "react";
import { useEffect } from "react";
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";

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
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

export default LogoutButton;