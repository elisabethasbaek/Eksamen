import "./Styling/Kalender.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import KalenderUser from "../Components/KalenderUser";
import KalenderInstructor from "../Components/KalenderInstructor";
import Heading from "../Components/Heading";
import Menu from "../Components/Menu";
import Button from "../Components/Button";
import { Link } from "@reach/router";
import SpinnerModule from "../Components/SpinnerModule";

export default function Kalender(){
    var [userCookie, setUserCookie] = useState("");
    var [user, setUser] = useState([]);

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];

            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    useEffect(function(){
        if(getCookie("token") !== ""){
            setUserCookie(JSON.parse(getCookie("token")));
        }
    }, [setUserCookie]);

    useEffect(function(){
        axios.get(`http://localhost:4000/api/v1/users/${userCookie.userId}`, {
            "headers": {
                "Authorization": `Bearer ${userCookie.token}`
            }
        })
        .then(function(response) {
            setUser(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, [setUser, userCookie.userId, userCookie.token]);

    function UserType(){
        if(userCookie.role === "default"){
            return(
                <KalenderUser />
            )
        }
    
        if(userCookie.role === "instructor"){
            return(
                <KalenderInstructor />
            )
        }
    }

    return(
        <main className="kalender">
            <Heading text="Kalender" />

            {!userCookie
                ?   <>
                    <p className="kalender__errorText">Log ind for at se din oversigt</p>
                    <Link to="/login" className="kalender__loginLink">
                        <Button text="Log ind" />
                    </Link>
                    </>
                :   UserType()
            }

            <Menu />
        </main>
    )
}