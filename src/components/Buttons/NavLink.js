import React from "react";
import classes from "./NavLink.module.css";
import { useNavigate } from "react-router-dom";

function NavLink({ navLabel, linkTo, onClick }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick(); // Call the passed onClick function if it exists
        }
        navigate(linkTo);
    };

    return (
        <button className={classes.navLink} onClick={handleClick}>
            {navLabel}
        </button>
    );
}

export default NavLink;
