import React from 'react';
import {useLocation} from "react-router-dom";
import {logout} from "../../utils/Auth/authFunctions";
import {useDispatch} from "react-redux";
import {clearToken} from "../../store/slices/AuthSlice";
import {clearUserData} from "../../store/slices/UserDataSlice";

function Home() {
    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

export default Home;