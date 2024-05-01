import classes from "./Loader.module.css";
import React from "react";

function Loader() {
    return (
        <div className="h-[100%] w-[100%] bg-black flex items-center justify-center">
            <div className="flex flex-col items-center space-y-5">
                <span className="text-white text-lg">Creating your itinerary</span>
                <div className={classes.loader} />
            </div>
        </div>
    );
}

export default Loader;
