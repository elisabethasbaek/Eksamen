import "./index.scss";
import TokenContext from "./TokenContext";
import React, { useState } from "react";
import { Router } from "@reach/router";

import Velkommen from "./Pages/Velkommen";
import Aktiviteter from "./Pages/Aktiviteter";
import Aktivitetsdetaljer from"./Pages/Aktivitetsdetaljer";
import DefaultKalender from "./Pages/DefaultKalender";
import Holdoversigt from "./Pages/Holdoversigt";
import Search from "./Pages/Search";
import Login from "./Pages/Login";

export default function App() {
    var tokenState = useState({});

    return (
        <TokenContext.Provider value={tokenState}>
            <Router>
                <Velkommen default />
                <Aktiviteter path="/aktiviteter" />
                <Aktivitetsdetaljer path="/aktiviteter/:id" />
                <DefaultKalender path="/defaultkalender" />
                <Search path="/search" />
                <Login path="/login" />
                <Holdoversigt path="/holdoversigt" />
            </Router>
        </TokenContext.Provider>
    );
}
