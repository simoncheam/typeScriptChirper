import * as React from "react";
import {NavLink} from "react-router-dom"

//active class name and active style with navlink

const Navbar = () => {

    return(

            <div className="bg-primary">
            <NavLink className= "btn btn-outline-dark m-2" activeClassName="btn-dark text-white" exact to ="/" > Home </NavLink>
            {/* <NavLink className= "btn btn-outline-dark m-2" activeClassName="btn-dark text-white" exact to ="/chirps" > All Chirps </NavLink> */}
            <NavLink className= "btn btn-outline-dark m-2" activeClassName="btn-dark text-white" exact to ="/create" > Create Chirp </NavLink>


            </div>
         )
};
export default Navbar;