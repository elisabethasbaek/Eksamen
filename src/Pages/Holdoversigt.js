import axios from "axios";
import { useEffect, useState } from "react";
import Heading from "../Components/Heading";
import "./Styling/Holdoversigt.scss";
import Button from "../Components/Button";
import Menu from "../Components/Menu";
import { Link } from "@reach/router";
import SpinnerModule from "../Components/SpinnerModule";

export default function Holdoversigt(props){
    var [activity, setActivity] = useState([]);
    var [userCookie, setUserCookie] = useState("");
    var [isLoading, setIsLoading] = useState(true);
    
    useEffect(function () {
        axios.get(`http://localhost:4000/api/v1/activities/${props.id}`)
        .then(function (response) {
            setActivity(response.data);
            setIsLoading(false);
        })
        .catch(error => {
            console.error(error);
        })
    }, [props.id, setActivity]);

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

    return(
        <main className="holdoversigt">
            {isLoading
                ?   <SpinnerModule />
                :   <>
                    <Heading text={activity.name} />

                    {userCookie.role === "instructor"
                        ?   activity.users?.map(function(user){
                                return(
                                    <p className="holdoversigt__name">{user.firstname} {user.lastname}</p>
                                )
                            })
                        :   <div className="holdoversigt__fejl">
                                <p>Du har ikke adgang til informationen p?? denne side</p>
                                <p>Log ind p?? din instrukt??r-profil og pr??v igen</p>
                                <Link className="toLogIn" to="/login"><Button text="Log ind" /></Link>
                            </div>
                    }

                    <Menu />
                    </>
            }
        </main>
    )
}