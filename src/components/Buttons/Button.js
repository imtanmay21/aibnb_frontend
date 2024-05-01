import classes from "./Button.module.css";
import React from "react";

function Button({ type, label, onClick }) {
    return (
        <button
            className={`py-3 bg-transparent border-2 border-white text-white text-sm h-[50px] w-[100%] ${classes.button}`}
            type={type} // type can be submit
            onClick={onClick} // handle on click
        >
            {/* Text to be displayed inside the button */}
            {label.toUpperCase()}
        </button>
    );
}

export default Button;