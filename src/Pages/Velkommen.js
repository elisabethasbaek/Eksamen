import Button from "../Components/Button";
import "./Styling/Velkommen.scss";
import React from "react";
import { Link } from "@reach/router";

export default function Velkommen(){
    return(
        <main className="velkommen">
            <img className="velkommen__background" src="/splash-image.jpg" alt="background"/>

            <img src="./logo.png" alt="Landrup Dans logo" className="velkommen__logo" />

            <Link to="/aktiviteter" className="velkommen__button">
                <Button type="submit" text="Kom i gang" />
            </Link>
        </main>
    )
}