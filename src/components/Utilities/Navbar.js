import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authQueries } from "../../api/authQueries";
import Logo from "../../assets/logo.jpg";
import NavLink from "../Buttons/NavLink";

const NAV_LINKS = [
    {
        id: 1,
        label: "Home",
        linkTo: "/dashboard",
    },
    {
        id: 2,
        label: "Profile",
        linkTo: "/profile",
    },
    {
        id: 3,
        label: "Public Itineraries",
        linkTo: "/publicItinerary"
    },
    {
        id: 4,
        label: "Logout",
    },
];

function Navbar() {
    // declare navigate instance
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // get auth token from redux
    const { access_token } = useSelector((state) => state.UserReducer);

    const handleLogout = () => {
        authQueries.logoutUser(dispatch);
        console.log("Logged Out");
        navigate("/");
    };

    return (
        <div className="h-[100px] w-[100vw] flex flex-ro w items-center justify-center">
            <div className="flex-[0.7] flex flex-row items-center justify-between">
                {/* Nav brand */}
                <div className="flex flex-row items-center space-x-3">
                    <div className="bg-white rounded-full">
                        <img src={Logo} className="h-[40px] w-[40px]" />
                    </div>
                    <h1 className="text-3xl text-white font-bold font-[arizonia]">
                        AiBnB
                    </h1>
                </div>

                <div className="flex flex-row space-x-10">
                    {/* Nav items */}
                    {NAV_LINKS.map((link, index) => (
                        <NavLink
                            key={index}
                            navLabel={link.label}
                            linkTo={link.linkTo}
                            onClick={
                                link.label === "Logout" ? handleLogout : null
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
