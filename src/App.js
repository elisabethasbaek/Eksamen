import "./index.scss";
import TokenContext from "./TokenContext";
import SearchContext from "./SearchContext";
import React, { useState } from "react";
import { Router } from "@reach/router";

import Velkommen from "./Pages/Velkommen";
import Aktiviteter from "./Pages/Aktiviteter";
import Aktivitetsdetaljer from"./Pages/Aktivitetsdetaljer";
import Holdoversigt from "./Pages/Holdoversigt";
import Search from "./Pages/Search";
import Login from "./Pages/Login";
import Kalender from "./Pages/Kalender";

export default function App() {
    var tokenState = useState({});
    var [openClose, setOpenClose] = useState(false);

    return (
        <TokenContext.Provider value={tokenState}>
        <SearchContext.Provider value={{openClose, setOpenClose}}>
            <Router>
                <Velkommen default />
                <Aktiviteter path="/aktiviteter" />
                <Aktivitetsdetaljer path="/aktiviteter/:id" />
                <Kalender path="/kalender" />
                <Holdoversigt path="/kalender/:id" />
                <Search path="/search" />
                <Login path="/login" />
            </Router>
        </SearchContext.Provider>
        </TokenContext.Provider>
    );
}
