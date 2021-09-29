import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../Components/Menu";
import "./Styling/Aktivitetsdetaljer.scss";
import Button from "../Components/Button";
import { Link } from "@reach/router";

export default function Aktivitetsdetaljer(props){
    var [activity, setActivity] = useState([]);
    var [user, setUser] = useState([]);
    var [userCookie, setUserCookie] = useState("");
    
    useEffect(function () {
        axios.get(`http://localhost:4000/api/v1/activities/${props.id}`)
        .then(function (response) {
            setActivity(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, [props.id, setActivity]);

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

    function signupLeave(){
        function signUp(){ 
            axios.post(`http://localhost:4000/api/v1/users/${userCookie.userId}/activities/${props.id}`, "", {
                "headers": {
                    "Authorization": `Bearer ${userCookie.token}`
                }
            })
            .then(response => {
                console.log(response.data);
                window.location.reload(); /* ikke optimal løsning boy do i know */
            })
        }
    
        function deleteFromActivity(){ 
            axios.delete(`http://localhost:4000/api/v1/users/${userCookie.userId}/activities/${props.id}`, {
                "headers": {
                    "Authorization": `Bearer ${userCookie.token}`
                }
            })
            .then(response => {
                console.log(response.data);
                window.location.reload(); /* ikke optimal løsning boy do i know */

            })
        }
        
        var matchy = user.activities?.filter((activity) => activity.id.toString().match(props.id));

        if (matchy && matchy.length === 0){
            return(
                <Button
                    text="Tilmeld"
                    onClick={signUp}
                    key={1 + (Math.random() * (10000000000-1))}
                />
                )
        } else {
            return (
                <Button
                    text="Afmeld"
                    onClick={deleteFromActivity}
                    key={1 + (Math.random() * (10000000000-1))}
                />
            )
        }
    }

    console.log(user)

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
        <main className="aktivitetsdetaljer">
            <div className="aktivitetsdetaljer__image">
                <img src={activity.asset?.url} alt="" className="image" />

                {userCookie
                ? signupLeave()
                : <Link to="/login" className="buttonLink"><Button text="Log ind for at tilmelde" /></Link>}
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