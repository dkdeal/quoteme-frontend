import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useAppContext } from "./libs/contextLib";

import AuthenticatedRoute from "./libs/AuthRoute";
import UnauthenticatedRoute from "./libs/UnAuthRoute";

import Navbar from "./components/Navbar";
import Message from "./components/Message";

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MyQuotesPage from './pages/MyQuotesPage';
import QuoteFormPage from './pages/QuoteFormPage';
import HomePage from './pages/HomePage';

export default function Routes() {
  const { isAuthenticated, userHasAuthenticated, message, setMessage } = useAppContext();

  useEffect(() => {
    if(message != ""){
      setTimeout(() => setMessage(""), 5000)
    }
  })

  

  return (
    <Router>
      <div>
        {isAuthenticated ? <Navbar />: <Link to="/">All Quotes</Link> }
        {message ? <Message content={message} /> : null}
        <Switch>
          
          <AuthenticatedRoute path="/edit/:id">
            <QuoteFormPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/add">
            <QuoteFormPage />
          </AuthenticatedRoute>
          <UnauthenticatedRoute path="/login">
            <LoginPage />
          </UnauthenticatedRoute>
          <UnauthenticatedRoute path="/signup">
             <SignUpPage />
          </UnauthenticatedRoute> 
          <AuthenticatedRoute path="/profile">
             <MyQuotesPage />
          </AuthenticatedRoute>
          <Route path="/">
             <HomePage />
          </Route> 
          
        </Switch>
      </div>
    </Router>
  );
}