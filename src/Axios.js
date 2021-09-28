import axios from "axios";
import { useEffect, useState } from "react";

export default function Assets(){
    var [assets, setAssets] = useState([]);
    
    useEffect(function () {
        axios.get("http://localhost:4000/api/v1/assets")
        .then(function (response) {
            setAssets(response.data);
        });
    }, [setAssets]);
};

export default function Asset({id}){
    var [asset, setAsset] = useState([]);
    
    useEffect(function (){
        axios.get(`http://localhost:4000/api/v1/assets/${id}`)
        .then(function (response) {
            setAsset(response.data);
        });
    }, [setAsset]);
};



