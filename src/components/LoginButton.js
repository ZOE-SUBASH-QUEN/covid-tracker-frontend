import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button variant ="outline-success" onClick={() => loginWithRedirect()} style={{position:"relative",left:"25%"}}>Log In</Button>;
};

export default LoginButton;