import { Outlet } from "react-router-dom";
import {Navbar} from '../import'

export default function SharedLayout(){
    return(
        <>
        <Navbar/>
        <Outlet/>
        </>
    )
}