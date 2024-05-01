import React from "react";
import LargeHeading from "../Texts/LargeHeading";
import Button from "../Buttons/Button";

const DayCardDetail = ({ label, value }) => (
    <div>
        <span className="text-lg text-white font-bold">{label}: </span>
        <span className="text-white">{value}</span>
    </div>
);

const DayCard = ({
    events,
    dayNumber,
    foodRecommendation,
    accomodationRecommendation,
}) => (
    <div className="border-2 border-white p-5 flex flex-col space-y-5">
        {/* Day Number */}
        <div>
            <span className="text-white text-3xl font-bold">
                Day {dayNumber}
            </span>
        </div>

        {/* Day Events */}
        <div className="flex flex-col space-y-5">
            {events.map((dayEvent, index) => (
                <div
                    key={index}
                    className={`${
                        index !== events.length - 1 && "border-b-2"
                    } border-white py-4`}
                >
                    {/* Time Stamp */}
                    <DayCardDetail
                        label="Time"
                        value={dayEvent["Time Stamp"]}
                    />

                    {/* Activity */}
                    <DayCardDetail label="To Do" value={dayEvent["Activity"]} />

                    {/* Travel Details */}
                    {dayEvent["Travel Detail"] && (
                        <DayCardDetail
                            label="Travel Details"
                            value={dayEvent["Travel Detail"]}
                        />
                    )}
                </div>
            ))}
            {/* Food Recommendation */}
            {foodRecommendation && (
                <DayCardDetail
                    label="Food Recommendation"
                    value={foodRecommendation}
                />
            )}

            {/* Accomdation Recommendation */}
            {/* Food Recommendation */}
            {accomodationRecommendation && (
                <DayCardDetail
                    label="Accomodation Recommendation"
                    value={accomodationRecommendation}
                />
            )}
        </div>
    </div>
);

function ItineraryShowcaseCard({ itinerary }) {
    return (
        <div className="flex flex-col space-y-5">
            {/* Title */}
            <div>
                <LargeHeading>{itinerary["Title"]}</LargeHeading>
            </div>

            {/* Show days data in cards */}

            <div className="flex flex-col space-y-10">
                {itinerary["Days"].map((day, index) => (
                    <DayCard
                        key={index}
                        dayNumber={day["Day"]}
                        events={day["Events"]}
                        foodRecommendation={day["Food Recommendation"]}
                        accomodationRecommendation={
                            day["Accommodation Recommendation"]
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export default ItineraryShowcaseCard;
