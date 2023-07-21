import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Auth/Login/Login";
import Registration from "./pages/Auth/Registration/Registration";
import Home from "./pages/Home/Home";
import Error from "./pages/Erorr/Error";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {firstEffectEntry} from "./utils/Auth/authFunctions";
import LoadingBlock from "./components/Loading/LoadingBlock";
import CenterWrapper from "./components/Wrapper/CenterWrapper/CenterWrapper";
import UserProfile from "./pages/Users/UserProfile/UserProfile";
import UserSetting from "./pages/Users/UserSetting/UserSetting";


const routes = createBrowserRouter(createRoutesFromElements(
    <Route path={"/"} element={<Layout/>}>
        <Route path={'/home'} element={<Home/>}/>
        <Route path={"/auth"} isAuthNeed={false}>
            <Route path={"login"} element={
                <PrivateRoute isAuthNeed={false}>
                    <Login/>
                </PrivateRoute>
            }/>
            <Route path={"registration"} element={
                <PrivateRoute isAuthNeed={false}>
                    <Registration/>
                </PrivateRoute>
            }/>
        </Route>
        <Route path={'/market'}>
            <Route path={":id"}/>
            <Route path={":id/edit"}/>
            <Route path={":id/new"}/>
        </Route>
        <Route path={"/users"}>
            <Route path={":id"} element={<UserProfile/>} />

            <Route path={':id/setting'} element={
                <PrivateRoute isAuthNeed={true}>
                <UserSetting/>
                </PrivateRoute>
            }/>
        </Route>
        <Route path={"/terms"}/>
        <Route path={"/contacts"}/>
        <Route path="*" element={<Error error={"Not found"}/>} />
        <Route path={"/error"} element={<Error error={"Not found"}/>} />
    </Route>
))

function App (){

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await firstEffectEntry(dispatch);
            setIsLoading(true);
        };

        fetchData();
    }, []);

    if (!isLoading){
        return <CenterWrapper>
                <LoadingBlock className={"h-40 mt-60"}/>
            </CenterWrapper>
    }

    return (
        <>
            <RouterProvider router={routes}/>
        </>
    )
}



export default App;