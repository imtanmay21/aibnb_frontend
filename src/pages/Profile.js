import classes from "./Profile.module.css";
import { ArrowRightIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ShowcaseContainer from "../components/Utilities/ShowcaseContainer";
import Navbar from "../components/Utilities/Navbar";
import LargeHeading from "../components/Texts/LargeHeading";
import { authQueries } from "../api/authQueries";
import { itineraryQueries } from "../api/itineraryQueries";
import Button from "../components/Buttons/Button";

const ProfileLabel = ({ label, value }) => (
    <div className="flex flex-row">
        <span className="text-white font-bold">{label}:&nbsp;</span>
        <span className="text-white">{value}</span>
    </div>
);

function Profile() {
    // STATES
    const [itineraries, setItineraries] = useState([]);

    // HOOKS
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get user acess and refresh token
    const { accessToken, profileData } = useSelector(
        (state) => state.UserReducer
    );

    // function to fetch profile data
    const fetchProfileData = async () => {
        // invoke a api call to get profile data
        await authQueries.getProfile(accessToken, dispatch);

        // get the itineraries for the user
        const itineraries = await itineraryQueries.getAllItineraries(
            accessToken
        );

        setItineraries(itineraries);
    };

    // function to navigate to itinerary page
    const handleItineraryClick = (itineraryId) => {
        navigate(`/itinerary/${itineraryId}`);
    };

    // function to delete account
    const deleteAccount = async () => {
        await authQueries.deleteUser(accessToken);
        navigate("/");
    };

    // Get user information on load
    useEffect(() => {
        fetchProfileData();
    }, []);

    return (
        <div className="h-[100vh] overflow-hidden bg-black">
            {/* Navbar */}
            <Navbar />

            {/* Main */}
            <ShowcaseContainer>
                <div className="flex flex-row space-x-10 h-[100%] py-5">
                    {/* My profile information */}
                    <div className="p-5 flex flex-[0.2] flex-col h-[80%]">
                        {/* Profile Image */}
                        <div>
                            <UserCircleIcon height={200} color="white" />
                        </div>

                        {/* Profile Information */}
                        <div className="flex flex-col space-y-5">
                            <ProfileLabel
                                label="Email"
                                value={profileData?.email}
                            />
                            <ProfileLabel
                                label="Name"
                                value={`${profileData?.first_name} ${profileData?.last_name}`}
                            />
                            <Button
                                label="DELETE ACCOUNT"
                                onClick={deleteAccount}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 h-[80%] p-5 space-y-3">
                        <LargeHeading>MY ITINERARIES</LargeHeading>

                        {/* If itenaries are empty */}
                        {itineraries?.length === 0 ? (
                            <div className="h-[100%] flex flex-col items-center justify-center">
                                <span className="text-white">
                                    No Itineraries to show
                                </span>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                {/* Map itineraries */}
                                {itineraries?.map((itinerary, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            handleItineraryClick(itinerary.id)
                                        }
                                        className={`flex flex-row w-[100%] items-center justify-between p-5 border border-white ${classes.profileBtn}`}
                                    >
                                        <div>
                                            <span className="text-white text-lg">
                                                {itinerary.name}
                                            </span>
                                        </div>
                                        <div>
                                            <ArrowRightIcon
                                                color="white"
                                                height={30}
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </ShowcaseContainer>
        </div>
    );
}

export default Profile;
