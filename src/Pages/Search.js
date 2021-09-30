import axios from "axios";
import { useEffect, useState } from "react";
import AktivitetCard from "../Components/AktivitetCard";
import Heading from "../Components/Heading";
import Menu from "../Components/Menu";
import "./Styling/Search.scss";
import { useContext } from "react";
import SearchContext from "../SearchContext";

export default function Search(){
    var [activities, setActivities] = useState([]);
    var [searchResults, setsearchResults] = useState([]);
    var {openClose, setOpenClose} = useContext(SearchContext);
    
    useEffect(function () {
        axios.get("http://localhost:4000/api/v1/activities")
        .then(function (response) {
            setActivities(response.data);
        });
    }, [setActivities]);

    function search(event){
        var tempArray = activities.filter(element => {
            if(event.target.value.length >= 1){
                if(element.name.toLowerCase().includes(event.target.value.toLowerCase())){
                    return true
                } 
                if(element.weekday.toLowerCase().includes(event.target.value.toLowerCase())){
                    return true
                }
                if(element.description.toLowerCase().includes(event.target.value.toLowerCase())){
                    return true
                }
            } else {
                setsearchResults([]);
            }
        })

        setsearchResults(tempArray); 
    }
    
    return(
        <main className="search">
            <Heading text="Søg" />

            <form className="search__searchBar" autoComplete="off">
                <input
                    autoComplete="off"
                    type="search"
                    id="keyword"
                    name="keyword"
                    onKeyUp={search}
                    onFocus={() => setOpenClose(true)}
                />
                <button
                    className="fas fa-search">
                </button>
            </form>

            {openClose && 
            <ul className="search__liste">
                {searchResults.length === 0
                ? <p className="noResults">Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet</p>
                : searchResults.map(function(activity){
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
            </ul>}
            
            <Menu />
        </main>
    )
}