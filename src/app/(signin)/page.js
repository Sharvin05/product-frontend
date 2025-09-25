"use client";
import React from "react";
import AppButton from "@/Components/AppButton";
import "./signIn.css";
import AppInput from "@/Components/AppInput";
import { signIn } from "@/Services/ClientApi";
import Store from "@/Store";
import { ROUTES } from "@/Constants";
import { useRouter } from "next/navigation";
export default function SignIn() {
  const router = useRouter();

  const [keepLoggedIn, setKeepLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [usernameError,setUsernameError]=React.useState(null);
  const [passwordError,setPasswordError]=React.useState(null);
  const [errorMessage,setErrorMessage]=React.useState(null);

  function handleSignIn(){
    let valid = true;
    if(!username){
      setUsernameError(true);
      valid = false;
    }else{
      setUsernameError(null);
    }
    if(!password){
      setPasswordError(true);
      valid = false;
    }else{
      setPasswordError(null);
    }
    if(!valid){
      return
    }
    if(username && password){
      setErrorMessage(null)
      signIn({username,password,keepLoggedIn}).then(res=>{
        Store.setUserInfo(res?.user)
         router.push(ROUTES.PRODUCTS)
      }).catch(err=>{
        setErrorMessage(err?.message)
        
      })
    }
  }
  return (
    <div className="signin-container">
      <h2 className="signin-heading">Sign In</h2>
      <form className="signin-form" onSubmit={handleSignIn} >
        <AppInput
          placeholder="Username"
          id="username"
          name="username"
          className="signin-input"
          required
          error={usernameError}
          onChange={(value) => {
            setUsername(value)
            setUsernameError(null);
          }}
        />
        <AppInput
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          className="signin-input"
          required
          error={passwordError}
          onChange={(value) => {
            setPassword(value)
            setPasswordError(null);
          }}
        />
        <div className="keep-logged-in">
          <input
            type="checkbox"
            id="keepLoggedIn"
            name="keepLoggedIn"
            checked={keepLoggedIn} 
            onChange={e => setKeepLoggedIn(e.target.checked)}
          />
          <label htmlFor="keepLoggedIn">Keep me logged in</label>
        </div>
        <div className="error-box">
            {errorMessage ? <p className="error-text">{errorMessage}</p> : <></>}
        </div>
        <div className="signin-button-container">
          <AppButton
            label="Submit"
            type="button"
            rounded={true}
            style={{ width: "100%" }}
            variant="primary" 
            onClick={handleSignIn}
          />
        </div>
      </form>
    </div>
  );
}
