import React from "react";
import ReactDOM from "react-dom"
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom"
import Auth0ProviderWithHistory from "./auth0-provider-with-history";

ReactDOM.render(
    <Router>
        <Auth0ProviderWithHistory>
            <App />
        </Auth0ProviderWithHistory>
    </Router>,
    document.getElementById("root")
)

serviceWorker.unregister();
