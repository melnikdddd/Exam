import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Choose from "./pages/Auth/Choose/Choose";


const routes = createBrowserRouter(createRoutesFromElements(
    <Route path={"/"} element={<Layout/>}>
        <Route index path={'/'}/>
        <Route path={"/auth"}>
            <Route path={"choose"} element={<Choose/>}/>
            <Route path={"login"}/>
            <Route path={"registration"}/>
        </Route>
        <Route path={'/products'}>
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