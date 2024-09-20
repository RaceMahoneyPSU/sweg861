import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Form from "./views/Form"
import ThankYou from "./views/ThankYou"
import { useAuth0 } from "@auth0/auth0-react";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();


const App = () => {
    const { isAuthenticated, isLoading, error } = useAuth0();
    const history = useHistory();

    useEffect(() => {
        // If user is authenticated and not already on /form, redirect to /form
        if (isAuthenticated && history.location.pathname !== '/form') {
            history.push('/form');  // Redirect using history, not window.location
        }
    }, [isAuthenticated, history]);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/form" component={Form} />
            <Route path="/thank-you" component={ThankYou} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
