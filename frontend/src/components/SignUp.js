import React, { useState, useRef, useEffect } from 'react';
import api from '../services/api'
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

 // --- Styles --- //

const Signup = styled.div`
  color: #2c2c2c;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
`

const Input = styled.input`
  border-radius: .5rem;
  border: 1px solid hsl(0, 0%, 80%);
  color: #2c2c2c;
  font-size: 1rem;
  grid-column: 2;
  grid-row: 2;
  height: 3rem;
  margin-right: 1rem;
  margin: .5rem 0 1rem 0;
  outline: none;
  padding: 0 1rem;
  width: calc(100% - 2rem);

  &:hover {
    border: 1px solid #b3b3b3;
  }

  &:focus {
    border: 1px solid #2c7be5;
    box-shadow: 0 0 0 1px #2684ff;
  }
`

const SubmitButton = styled.button`
  background-color: #2c7be5;
  border-radius: .5rem;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  height: 3rem;
  padding: 0 2rem;
  width: 100%;

  &:hover {
    background-color: #1a68d1;
    transition: background-color .1s ease;
  }

  &:active {
    background-color: #134c97;
  }
`

const AltButton= styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
`

const FormHeader= styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
`

// --- Component --- //

const SignUp = ({ close, notify }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [newUser, setNewUser] = useState(false);

  const [, setCookie] = useCookies(['auth']);

  const emailInput = useRef();

  useEffect(() => {
    emailInput.current.focus();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    newUser ? handleSignUp() : handleLogIn();
  }

  const handleSignUp = () => {
    if (password !== confirmation) {
      return notify('Password and confirmation must match');
    }
    const data = { 'email': email, 'password': password }
    requestAuthToken(data);
  }

  const handleLogIn = () => {
    if (!email || !password) { return; }
    const data = { 'auth': { 'email': email, 'password': password  } }
    requestAuthToken(data);
  }

  const requestAuthToken = async (data) => {
    // Whether user is signing up for a new account or logging
    // into an existing one, a successful API call will return
    // an auth JWT token
    const url = `/${newUser ? 'users' : 'user_token'}`   
    try {
      const response = await api.post(url, data);
      response && setCookie('auth', response.data.jwt, { path: '/' });
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwt}`;
      response && close();
    } catch(err) {
      handleError(err.response.status)
    }
  }

  const handleError = (code) => {
    console.log(code)
    switch(code) {
      case 404:
        notify('Please check that your email and password are correct');
        break;
      case 422:
        notify('There is already an account with that email address');
        break;
      default:
        notify('Sorry, there was an error logging in');
    } 
  }

  const signUpForm = (
    <>
      <label>Confirm Password</label>
      <Input type='password'
        placeholder='Must match password' val={confirmation} required min='7'
        onChange={(e) => setConfirmation(e.target.value)}
      />
      <SubmitButton type='submit'>Sign Up</SubmitButton>
      <AltButton type='button' onClick={() => setNewUser(false)}>
        Log In
      </AltButton>
    </>
  )

  const logInForm = (
    <>
      <SubmitButton type='submit'>Log In</SubmitButton>
      <AltButton type='button' onClick={() => setNewUser(true)}>
        Sign Up
      </AltButton>
    </>
  )

  return (
    <Signup>
      <form onSubmit={handleSubmit}>
        <FormHeader>{newUser ? 'Sign Up' : 'Log In'}</FormHeader>
        <label>
          Email
          <Input type='email' placeholder='Enter you email address' 
            val={email} required ref={emailInput}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        
        <label>
          Password
          <Input type='password' placeholder='Must be at least 7 characters'
            val={password} required min='7'
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        
        {newUser ? signUpForm : logInForm}|
        <AltButton type='button' onClick={close}>Cancel</AltButton>
      </form>
    </Signup>
  )
}

export default SignUp;
