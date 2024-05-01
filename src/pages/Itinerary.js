import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { itineraryQueries } from "../api/itineraryQueries";
import { useSelector } from "react-redux";
import ShowcaseContainer from "../components/Utilities/ShowcaseContainer";
import ItineraryShowcaseCard from "../components/Cards/ItineraryShowcaseCard";
import Navbar from "../components/Utilities/Navbar";
import Button from "../components/Buttons/Button";

function Itinerary() {
    // get access token
    const { accessToken } = useSelector((state) => state.UserReducer);

    // get route parameters
    const { id } = useParams();

    // HOOKS
    const navigate = useNavigate();

    // STATES
    const [itinerary, setItinerary] = useState(null);
    const [isPublic, setIsPublic] = useState(false);

    // function to fetch itinerary data
    const fetchItineraryData = async () => {
        const itineraryById = await itineraryQueries.getItineraryById(
            id,
            accessToken
        );

        // set itinerary data
        setItinerary(itineraryById);
    };

    // function to update itinerary
    const updateItinerary = async () => {
        await itineraryQueries.updateItinerary(
            parseInt(id),
            accessToken,
            isPublic,
            itinerary
        );
        // navigate to profile
        navigate("/profile")
    };

    // function to make the radio button public
    const selectRadioButton = () => {
        setIsPublic(!isPublic);
    };

    useEffect(() => {
        // fetch itinerary data
        fetchItineraryData();
    }, []);

    return (
        <div className="bg-black h-[100vh] overflow-x-hidden overflow-y-auto">
            <Navbar />
            <ShowcaseContainer>
                <div className="flex justify-end space-x-5 items-center">
                    <button
                        onClick={selectRadioButton}
                        className="rounded-full border-2 border-white h-5 w-5 flex justify-center items-center"
                    >
                        <div
                            className={`h-3 w-3 rounded-full border-2 border-black ${
                                isPublic && "bg-white"
                            }`}
                        ></div>
                    </button>
                    <span className="text-white">
                        Make this itinerary public
                    </span>
                </div>
                {itinerary && <ItineraryShowcaseCard itinerary={itinerary} />}
                <div className="mt-6">
                    <Button label="SAVE" onClick={updateItinerary} />
                </div>
            </ShowcaseContainer>
        </div>
    );
}

export default Itinerary;
