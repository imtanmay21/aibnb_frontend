import classes from "./Profile.module.css";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Utilities/Navbar";
import ShowcaseContainer from "../components/Utilities/ShowcaseContainer";
import LargeHeading from "../components/Texts/LargeHeading";
import { itineraryQueries } from "../api/itineraryQueries";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import ItineraryShowcaseCard from "../components/Cards/ItineraryShowcaseCard";
import Button from "../components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicItinerary() {
    const { accessToken } = useSelector((state) => state.UserReducer);

    // HOOKS
    const navigate = useNavigate();

    // STATES
    const [itineraries, setItineraries] = useState([]);
    const [itineraryToDisplay, setItineraryToDisplay] = useState(null);

    // function to fetch public itineraries
    const fetchPublicItineraries = async () => {
        const itinerariesFetched =
            await itineraryQueries.getPublicItineraries();
        setItineraries(itinerariesFetched);
    };

    const saveItinerary = async () => {
        await itineraryQueries.saveItinerary(itineraryToDisplay, accessToken);
        navigate("/profile");
    };

    useEffect(() => {
        // fetch public itineraries on load
        fetchPublicItineraries();
    }, []);

    return (
        <div className="h-[100vh] bg-black overflow-auto">
            <Navbar />

            <ShowcaseContainer>
                {itineraryToDisplay !== null ? (
                    <div>
                        <ItineraryShowcaseCard itinerary={itineraryToDisplay} />
                        <div className="flex flex-col space-y-5 mt-5">
                            <Button label="SAVE" onClick={saveItinerary} />
                            <Button
                                label="CANCEL"
                                onClick={() => setItineraryToDisplay(null)}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            <LargeHeading>PUBLIC ITINERARIES</LargeHeading>
                        </div>

                        <div className="space-y-5 mt-5">
                            {itineraries.map((itinerary, index) => (
                                <button
                                    onClick={() =>
                                        setItineraryToDisplay(
                                            JSON.parse(
                                                itinerary.itinerary_description
                                            )
                                        )
                                    }
                                    key={index}
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
                    </div>
                )}
            </ShowcaseContainer>
        </div>
    );
}

export default PublicItinerary;
