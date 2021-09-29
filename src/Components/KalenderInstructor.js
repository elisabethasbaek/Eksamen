import axios from "axios";
import { useEffect, useState } from "react";
import KalenderHold from "./KalenderHold";
import "./Styling/KalenderInstructor.scss";

export default function KalenderInstructor(props){
    var [activities, setActivities] = useState([]);
    var [user, setUser] = useState([]);
    var [userCookie, setUserCookie] = useState("");
    
    useEffect(function () {
        axios.get("http://localhost:4000/api/v1/activities")
        .then(function (response) {
            setActivities(response.data);
        });
    }, [setActivities]);

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

    var matchy = activities.filter((activity) => activity.instructorId.toString().match(userCookie.userId));

    console.log(matchy);

    function Content(){
        if(matchy){
            return(
                <>
                {matchy.map(function(match){
                    return(
                        <KalenderHold
                            heading={match.name}
                            day={match.weekday}
                            time={match.time}
                            to="/holdoversigt"
                        />
                    )
                })}
                </>
            )
        }
    }

    return(
        Content()
    )
}