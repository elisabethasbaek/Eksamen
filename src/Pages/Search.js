import axios from "axios";
import { useEffect, useState } from "react";
import AktivitetCard from "../Components/AktivitetCard";
import Heading from "../Components/Heading";
import Menu from "../Components/Menu";
import "./Styling/Search.scss";

export default function Search(){
    var [activities, setActivities] = useState([]);
    
    useEffect(function () {
        axios.get("http://localhost:4000/api/v1/activities")
        .then(function (response) {
            setActivities(response.data);
        });
    }, [setActivities]);

    function handleSubmit(){

    }
    
    return(
        <main className="search">
            <Heading text="Søg" />

            <form onSubmit={handleSubmit} className="search__searchBar">
                <input
                    type="text"
                    id="search"
                    name="search"
                />
                <button
                    type="submit"
                    className="fas fa-search">
                </button>
            </form>

            <ul className="search__liste">
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
        </main>
    )
}