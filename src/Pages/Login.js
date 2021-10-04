import "./Styling/Login.scss";
import axios from "axios";
import {useForm} from "react-hook-form";
import TokenContext from "../TokenContext";
import {useState, useContext, useEffect} from "react";
import { navigate } from "@reach/router";
import Button from "../Components/Button";
import SpinnerModule from "../Components/SpinnerModule";

export default function Login(){
    var {handleSubmit, register, formState: {errors}} = useForm();
    var [loginError, setLoginError] = useState("");
    var setToken = useContext(TokenContext)[1];
    var [isLoading, setIsLoading] = useState(false);
    var [userCookie, setUserCookie] = useState("");

    function login(data){   
        setIsLoading(true);

        axios({
            method: "POST",
            url: "http://localhost:4000/auth/token",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                username: data.username,
                password: data.password
            }
        })
        .then(response => {
            setToken(response.data);

            if(data.rememberMe === true){
                var d = new Date();
                d.setTime(d.getTime() + (30*24*60*1000*30)); /* save information for 30 days */
                document.cookie = `token=${JSON.stringify(response.data)}; expires=${d.toUTCString()}`;
            }

            if(data.rememberMe === false){
                document.cookie = `token=${JSON.stringify(response.data)}`;
                /* cookie will be deleted once the window (not just the tab) is closed */
            }

            navigate("/aktiviteter");
        })
        .catch(function(error){
            setLoginError("Dit kodeord eller brugernavn var forkert");
        })
    }

    function logout(data){
        document.cookie = `token=; expires=${new Date(0).toUTCString()}`;
        navigate("/aktiviteter");
    }

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
        <main className="login">
            {isLoading
            ? <SpinnerModule />
            : null}

            <div className="login__background">
                <div className="overlay"></div>
                <img className="image" src="/splash-image.jpg" alt="background"/>
            </div>
            
            {!userCookie
                ?   <form onSubmit={handleSubmit(login)} className="login__form">
                        <div className="errors">
                            <span className="error">{loginError}</span>
                            {errors.username && <span className="error">Venligst indtast dit brugernavn</span>}
                            {errors.password && <span className="error">Venligst indtast dit kodeord</span>}
                        </div>

                        <fieldset>
                            <legend>Log ind</legend>

                            <input 
                                className="username"
                                id="username"
                                type="text"
                                placeholder="brugernavn"
                                {...register("username", {required: true})}>
                            </input>

                            <input
                                className="password"
                                id="password"
                                type="password"
                                placeholder="adgangskode"
                                {...register("password", {required: true})}>
                            </input>

                            <Button
                                type="submit"
                                text="Log ind"
                                disabled={isLoading}
                            />

                            <div className="rememberMe">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    id="rememberMe"
                                    {...register("rememberMe", {required: false})}
                                />
                                <label>Husk mig</label>
                            </div>
                        </fieldset>
                    </form>
                : <form onSubmit={handleSubmit(logout)} className="login__form">
                    <fieldset>
                        <legend>Log ud</legend>

                        <Button
                            type="submit"
                            text="Log ud"
                            disabled={isLoading}
                        />
                    </fieldset>
                </form>
            }
        </main>
    )
}