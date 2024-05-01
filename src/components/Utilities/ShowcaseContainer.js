import React from "react";

function ShowcaseContainer({ children }) {
    return (
        <div className="flex h-[100%] flex-row justify-center">
            <div className="flex-[0.7]">
                {/* Render the child components */}
                {children}
            </div>
        </div>
    );
}

export default ShowcaseContainer;
