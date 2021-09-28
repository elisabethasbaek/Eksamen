import axios from "axios";
import { useEffect, useState } from "react";
import "./Styling/Aktiviteter.scss";
import { Link } from "@reach/router";
import Heading from "../Components/Heading";
import Menu from "../Components/Menu";

export default function Aktiviteter(){
    var [activities, setActivities] = useState([]);
    
    useEffect(function () {
        axios.get("http://localhost:4000/api/v1/activities")
        .then(function (response) {
            setActivities(response.data);
        });
    }, [setActivities]);

    return(
        <main className="aktiviteter">
            <Heading text="Aktiviteter" />

            <ul className="aktiviteter__liste">
                {activities && activities.map(function(activity){
                    return(
                        <Link to={`/aktiviteter/${activity.id}`} key={`${activity.id}${activity.name}`} className="link">
                            <li className="enkeltAktivitet">
                                <img src={activity.asset.url} alt="" className="enkeltAktivitet__image"/>
                                <div className="enkeltAktivitet__text">
                                    <p className="name">{activity.name}</p>
                                    <p className="age">{activity.minAge}-{activity.maxAge} år</p>

                                </div>
                            </li>
                        </Link>
                    )
                })}
            </ul>

            <Menu />
        </main>
    )
}