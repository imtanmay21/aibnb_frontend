import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

function TripCard({ imgSource, tripName }) {
    return (
        <div className="rounded-lg relative h-[300px] flex flex-col space-y-3 cursor-pointer">
            {/* Background Image of the  card*/}
            <div className="flex-1">
                <img src={imgSource} className="rounded-lg h-[300px]" />
            </div>
            {/* Label name */}
            <div className="flex flex-row items-center justify-center space-x-3">
                <span className="text-white">{tripName}</span>
                <ArrowRightIcon color="#fff" height={20} />
            </div>
        </div>
    );
}

export default TripCard;
