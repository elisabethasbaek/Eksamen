import "./Styling/Login.scss";
import axios from "axios";
import {useForm} from "react-hook-form";
import TokenContext from "../TokenContext";
import {useState, useContext} from "react";
import { navigate } from "@reach/router";
import Button from "../Components/Button";

export default function Login(){
    var {handleSubmit, register, formState: {errors}} = useForm();
    var [loginError, setLoginError] = useState("");
    var setToken = useContext(TokenContext)[1];

    function login(data){   
        console.log(data);

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

    return(
        <main className="login">
            <div className="login__background">
                <div className="overlay"></div>
                <img className="image" src="/splash-image.jpg" alt="background"/>
            </div>

            <form onSubmit={handleSubmit(login)} className="login__form">
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

                        <Button type="submit" text="Log ind" />

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

        </main>
    )
}