import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../Components/Menu";
import "./Styling/Aktivitetsdetaljer.scss";
import Button from "../Components/Button";

export default function Aktivitetsdetaljer(props){
    var [activity, setActivity] = useState([]);
    var [userCookie, setUserCookie] = useState("");
    
    useEffect(function () {
        axios.get("http://localhost:4000/api/v1/activities/" + props.id)
        .then(function (response) {
            setActivity(response.data);
        });
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

    console.log(userCookie)

    return(
        <main className="aktivitetsdetaljer">
            <div className="aktivitetsdetaljer__image">
                <img src={activity.asset?.url} alt="" className="image" />

                {userCookie
                ? <Button text="Tilmeld" />
                : <Button text="Log ind for at tilmelde" />}
            </div>

            <div className="aktivitetsdetaljer__info">
                <p className="name">{activity.name}</p>
                <div className="timeWeekday">
                    <p className="weekday">{activity.weekday}</p>
                    <p className="time">{activity.time}</p>
                </div>
                <p className="age">{activity.minAge}-{activity.maxAge} år</p>
                <p className="description">{activity.description}</p>
            </div>

            <Menu />
        </main>
    )
}