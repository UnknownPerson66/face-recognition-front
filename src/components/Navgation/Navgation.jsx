import React from "react";
import './Navgation.css'
import Logo from "../Logo/Logo";
const Navgation = ({isSignedIn, onRouteChange}) => {
    if (isSignedIn){
        return (
            <nav className="Navgation" style={{display: 'flex', justifyContent: 'space-between'}}>
                <Logo/>
                <p onClick={() => onRouteChange('signout')} style={{cursor: 'pointer'}}>Sign out</p>
            </nav> 
        )
    }
}

export default Navgation;