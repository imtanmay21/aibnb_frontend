import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { itineraryQueries } from "../api/itineraryQueries";
import BeachShowcase from "../assets/beachShowcase.jpeg";
import ShowcaseContainer from "../components/Utilities/ShowcaseContainer";
import Navbar from "../components/Utilities/Navbar";
import LargeHeading from "../components/Texts/LargeHeading";
import TextBox from "../components/Inputs/TextBox";
import Button from "../components/Buttons/Button";
import DateInput from "../components/Inputs/DateInput";
import Loader from "../components/Utilities/Loader";
import ItineraryShowcaseCard from "../components/Cards/ItineraryShowcaseCard";

function CreateItinerary() {
    const { accessToken } = useSelector((state) => state.UserReducer);

    // STATES
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [preference, setPreference] = useState("");
    const [budget, setBudget] = useState("");
    const [guests, setGuests] = useState("");
    const [preferences, setPreferences] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [itineraryCreated, setItineraryCreated] = useState(null);

    // HOOKS
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function to create itinerary
    const createItinerary = async () => {
        // show loader till the itinerary is created
        setIsLoading(true);

        // QUERY: post a request to create an itinerary
        const itinerary = await itineraryQueries.createItinerary(
            location,
            startDate,
            endDate,
            guests,
            budget,
            preferences,
            accessToken,
            dispatch
        );

        if (itinerary) {
            // set itineraryCreated
            setItineraryCreated(itinerary);
        }

        setIsLoading(false);
    };

    // function to add preference
    const addPreference = () => {
        // add preference to preferences
        setPreferences([...preferences, preference]);

        // reset the input preference
        setPreference("");
    };

    // function to delete preference
    const deletePreference = (selectedIndex) => {
        // filter preferences to not include the deleted preference
        const filteredPreferences = preferences.filter(
            (_, index) => index !== selectedIndex
        );
        // set preferences to be the filtered preferences
        setPreferences(filteredPreferences);
    };

    // function to save itinerary
    const saveItinerary = async () => {
        // succesfully save itinerary
        await itineraryQueries.saveItinerary(itineraryCreated, accessToken);

        // remove the itinerary created state
        setItineraryCreated(null);
        navigate("/profile")
    };

    return (
        <div className="h-[100vh] py-5 overflow-auto relative bg-black overflow-x-hidden">
            {/* Navbar */}
            <Navbar />
            {/* Loader */}
            {isLoading ? (
                <div className="absolute top-0 left-0 h-[100%] w-[100%]">
                    <Loader />
                </div>
            ) : itineraryCreated ? (
                <ShowcaseContainer>
                    <ItineraryShowcaseCard itinerary={itineraryCreated} />
                    <div className="my-5">
                        <Button label="Save" onClick={saveItinerary} />
                    </div>
                </ShowcaseContainer>
            ) : (
                <ShowcaseContainer>
                    {/* Main */}
                    <div className="h-[100%] flex flex-col justify-center">
                        <LargeHeading>AIBNB YOUR NEXT TRIP</LargeHeading>

                        <div className="flex flex-row mt-5 space-x-10">
                            {/* Itinerary Form */}
                            <div className="flex flex-col flex-1 space-y-8">
                                {/* Location Input */}
                                <div>
                                    <TextBox
                                        value={location}
                                        placeholder="Enter Location"
                                        onChange={(e) =>
                                            setLocation(e.target.value)
                                        }
                                    />
                                </div>

                                {/* Date Inmput */}
                                <div className="flex flex-row items-end space-x-10">
                                    <DateInput
                                        inputValue={startDate}
                                        onChange={(e) =>
                                            setStartDate(e.target.value)
                                        }
                                        placeholder="Start Date"
                                    />
                                    <span className="text-white">TO</span>
                                    <DateInput
                                        inputValue={endDate}
                                        onChange={(e) =>
                                            setEndDate(e.target.value)
                                        }
                                        placeholder="End Date"
                                    />
                                </div>

                                {/* User Preferences */}
                                <div className="flex flex-col space-y-5">
                                    <TextBox
                                        value={preference}
                                        onChange={(e) =>
                                            setPreference(e.target.value)
                                        }
                                        placeholder="Preferences"
                                        rightIcon={
                                            <PlusIcon
                                                color="white"
                                                height={20}
                                            />
                                        }
                                        onClickIcon={addPreference}
                                    />

                                    {/* Preferences */}
                                    {preferences.length > 0 && (
                                        <div className="flex flex-row space-x-3">
                                            {preferences.map(
                                                (preference, index) => (
                                                    <div
                                                        key={index}
                                                        className="border border-white flex flex-row p-2 space-x-2"
                                                    >
                                                        <span className="text-white">
                                                            {preference}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                deletePreference(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <XMarkIcon
                                                                color="white"
                                                                height={20}
                                                            />
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Budget */}
                                <div>
                                    <TextBox
                                        value={budget}
                                        onChange={(e) =>
                                            setBudget(e.target.value)
                                        }
                                        placeholder="Budget"
                                    />
                                </div>

                                {/* Guests */}
                                <div>
                                    <TextBox
                                        value={guests}
                                        onChange={(e) =>
                                            setGuests(e.target.value)
                                        }
                                        placeholder="Guests"
                                    />
                                </div>

                                {/* Submit form */}
                                <Button
                                    label="LET'S GO"
                                    onClick={createItinerary}
                                />
                            </div>

                            {/* Form Showcase Image */}
                            <div className="flex flex-1 flex-col">
                                <img src={BeachShowcase} />
                            </div>
                        </div>
                    </div>
                </ShowcaseContainer>
            )}
        </div>
    );
}

export default CreateItinerary;
