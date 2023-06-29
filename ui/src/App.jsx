import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Auth/Login/Login";
import Registration from "./pages/Auth/Registration/Registration";
import Home from "./pages/Home/Home";
import Error from "./pages/Erorr/Error";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setToken} from "./store/slices/AuthSlice";


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
            <Route path={":id"}/>
            <Route path={':id/edit'}/>
        </Route>
        <Route path={"/terms"}/>
        <Route path={"/contacts"}/>
        <Route path="*" element={<Error error={"Not found"}/>} />
    </Route>
))

function App (){
    const dispatch = useDispatch();
    useEffect(() => {
     const token = window.localStorage.getItem('token');
     if (token){
         dispatch(setToken(token));
     }
    }, []);

    return (
        <>
            <RouterProvider router={routes}/>
        </>
    )
}



export default App;