import React from "react";

import ShowcaseContainer from "../components/Utilities/ShowcaseContainer";
import Navbar from "../components/Utilities/Navbar";
import LargeHeading from "../components/Texts/LargeHeading";
import ExtraLargeHeading from "../components/Texts/ExtraLargeHeading";
import Caption from "../components/Texts/Caption";
import { recommendedTripsData } from "../constants/recommendedTripsData";
import TripCard from "../components/Cards/TripCard";
import Button from "../components/Buttons/Button";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="relative ">
            <div
                className={`h-[100vh] w-full bg-black relative overflow-x-hidden`}
            >
                <div className="z-40 absolute">
                    <Navbar />

                    {/* Showcase */}
                    <ShowcaseContainer>
                        <div className="h-[80vh] flex flex-col justify-center">
                            <div className="space-y-10 mb-20">
                                <div>
                                    <LargeHeading>TRIPS WITH US</LargeHeading>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <ExtraLargeHeading>AiBnB</ExtraLargeHeading>
                                </div>
                                <div className="flex flex-row justify-end">
                                    <LargeHeading>TRAVEL WITH US</LargeHeading>
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-[50%]">
                                    <Button
                                        onClick={() =>
                                            navigate("/createItinerary")
                                        }
                                        label="CREATE ONE NOW!"
                                    />
                                </div>
                            </div>
                        </div>
                    </ShowcaseContainer>
                </div>
            </div>

            <div className="h-[70vh] py-10 bg-black">
                <ShowcaseContainer>
                    <div className="h-[100%] flex flex-col space-y-6">
                        {/* Header */}
                        <div className="flex flex-col space-y-3">
                            <LargeHeading>EXPLORE THE WORLD</LargeHeading>
                            <Caption>
                                See some of our recommended places
                            </Caption>
                        </div>

                        {/* Itineraries */}
                        <div className="flex flex-row items-center justify-between space-x-4">
                            {recommendedTripsData.map((trip, index) => (
                                <TripCard
                                    key={index}
                                    tripName={trip.name}
                                    imgSource={trip.imageSource}
                                />
                            ))}
                        </div>
                    </div>
                </ShowcaseContainer>
            </div>
        </div>
    );
}

export default Dashboard;
