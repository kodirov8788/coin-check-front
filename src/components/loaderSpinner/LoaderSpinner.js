import React, { useContext } from "react";
import "./spinner.css";
import { AuthContext } from "../../context/AuthContext";

function LoadingSpinner({ boolean }) {

    let { isLoading, setIsLoading } = useContext(AuthContext)
    console.log(isLoading)
    return (
        <div style={boolean === false ? { display: "none" } : { display: "flex" }} className="spinner-container">
            <div className="loading-spinner" >
            </div>
        </div >
    );
}
export default LoadingSpinner