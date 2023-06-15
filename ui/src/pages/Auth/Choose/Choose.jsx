import React from 'react';
import {NavLink} from "react-router-dom";
import "./Choose.scss";

function Choose() {
    return (

            <div className="root-block">
                <div className="main-block">
                    <form action="">
                        <input type="text" placeholder={"Email or your phone number."}/>
                    </form>
                    <div>
                        <p>Dont have account? <NavLink to={"/registration"}>Sign up.</NavLink></p>
                    </div>
                    <div style={{textAlign: "center"}}>
                        or
                    </div>
                    <div>
                        <NavLink to={"/google"}>Continue with Google</NavLink>
                    </div>
                    <div>
                        <NavLink to={"/telegram"}>Continue with Telegram</NavLink>
                    </div>
                </div>
            </div>
    );
}

export default Choose;