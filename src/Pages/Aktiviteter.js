import axios from "axios";
import { useEffect, useState } from "react";
import "./Styling/Aktiviteter.scss";
import Heading from "../Components/Heading";
import Menu from "../Components/Menu";
import AktivitetCard from "../Components/AktivitetCard";
import SpinnerModule from "../Components/SpinnerModule";

export default function Aktiviteter(){
    var [activities, setActivities] = useState([]);
    var [isLoading, setIsLoading] = useState(true);
    
    useEffect(function () {
        axios.get("http://localhost:4000/api/v1/activities")
        .then(function (response) {
            setActivities(response.data);
            setIsLoading(false);
        });
    }, [setActivities]);

    return(
        <main className="aktiviteter">
            {isLoading
                ?   <SpinnerModule />
                :   <>
                    <Heading text="Aktiviteter" />

                    <ul className="aktiviteter__liste">
                        {activities && activities.map(function(activity){
                            return(
                                <AktivitetCard
                                    to={`/aktiviteter/${activity.id}`}
                                    key={`${activity.id}${activity.name}`}
                                    alt={activity.name}
                                    src={activity.asset.url}
                                    name={activity.name}
                                    minAge={activity.minAge}
                                    maxAge={activity.maxAge}
                                />
                            )
                        })}
                    </ul>

                    <Menu />
                    </>
            }
        </main>
    )
}