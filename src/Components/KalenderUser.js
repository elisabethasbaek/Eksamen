import axios from "axios";
import { useEffect, useState } from "react";
import KalenderHold from "./KalenderHold";
import "./Styling/KalenderUser.scss";

export default function KalenderUser(){
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

    return(
        <article className="kalenderUser">
            {user.activities?.map(function(activity) {
                return (
                    <KalenderHold
                        heading={activity.name}
                        day={activity.weekday}
                        time={activity.time}
                        to={`/aktiviteter/${activity.id}`}
                    />
                    )
            })}
        </article>
    )
}