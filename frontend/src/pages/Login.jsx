import NavBar from "component/NavBar";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { Box } from '@mui/material';

import server from "config/axiosConfig";

// import Button from



const Login = () => {
  console.log("!!");
  const responseMessage = (response) => {
      console.log(response);
      server.post("/auth/login/google", { client_id: response.credential })
      .then(response => {
        console.log(response)
      })
      .catch(error => {

      })
  };
  const errorMessage = (error) => {
      console.log(error);
  };

  return (
    <div>
      <NavBar />
      <Box elevation={3} sx={{backgroundColor:"#2a2a2a", width:"500px"}}>
        <h2>로그인 페이지.</h2>

        <div>
          <GoogleOAuthProvider clientId={"121079642070-uphpll1qg5mpv0ils68ssk9o0n5q3hdc.apps.googleusercontent.com"}>
            <GoogleLogin 
            onSuccess={responseMessage} 
            onError={errorMessage} />
          </GoogleOAuthProvider>
        </div>
      </Box>
      
      
    </div>
  );
}

export default Login;
