import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Auth/Login/Login";
import Registration from "./pages/Auth/Registration/Registration";
import Home from "./pages/Home/Home";
import Error from "./pages/Erorr/Error";


const routes = createBrowserRouter(createRoutesFromElements(
    <Route path={"/"} element={<Layout/>}>
        <Route path={'/home'} element={<Home/>}/>
        <Route path={"/auth"}>
            <Route path={"login"} element={<Login/>}/>
            <Route path={"registration"} element={<Registration/>}/>
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
    return (
        <>
            <RouterProvider router={routes}/>
        </>
    )
}



export default App;