import axios from "axios";
import { baseUrl } from "./baseUrl";

// function to calcualte days between the start date and the end date
const calculateDays = (startDate, endDate) => {
    // Create a start date and an end date Date object
    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);

    // calculate the difference between the two objects in milliseconds
    const timeDifference = endDateObject - startDateObject;

    // Convert milliseconds to days
    const days = timeDifference / (1000 * 3600 * 24);

    return days;
};

// function to convert preferences array to a string seperated
// by ,
const convertPreferencesToString = (preferences) => {
    return preferences.join(", ");
};

// export the queries handling requests regarding
// itinerary creation, storing, editing
export const itineraryQueries = {
    // createItinerary
    createItinerary: async (
        destination,
        startDate,
        endDate,
        guests,
        budget,
        preferences,
        accessToken
    ) => {
        // get the total number of days to create the itinerary for
        const days = calculateDays(startDate, endDate);

        // get the preferences in string format
        const preferencesString = convertPreferencesToString(preferences);

        // itinerary input data
        const itineraryInputData = {
            destination: destination,
            days: days,
            guests: guests,
            budget: budget,
            preferences: preferencesString,
        };

        try {
            // get the response generated
            const response = await axios.post(
                `${baseUrl}/itinerary/get-itinerary/`,
                itineraryInputData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            console.log("response", response.data.data.itinerary);

            // get itinearry data
            const itinerary = JSON.parse(response.data.data.itinerary);

            // return itinerary data
            return itinerary;
        } catch (error) {
            console.log("error", error);
            alert("Something went wrong");
        }
    },

    // save itinerary
    saveItinerary: async (itineraryCreated, accessToken) => {
        // post the itinerary created
        try {
            await axios.post(
                `${baseUrl}/itinerary/create-itinerary/`,
                {
                    name: itineraryCreated["Title"],
                    itinerary_description: JSON.stringify(itineraryCreated),
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        } catch (error) {
            console.error("Something went wrong while saving itinerary", error);
        }
    },

    // get all itineraries
    getAllItineraries: async (accessToken) => {
        // get itineraries of the user
        try {
            const response = await axios.get(
                `${baseUrl}/itinerary/get-user-itineraries/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            // Unpack the itineraries
            const itineraries = response.data.data;

            return itineraries;
        } catch (error) {
            console.error("");
        }
    },

    // get itinerary by id
    getItineraryById: async (id, accessToken) => {
        // create a axios get request to get itinerary
        try {
            // get response
            const response = await axios.get(
                `${baseUrl}/itinerary/get-user-itineraries/?ids=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            // unpack itinerary
            const itinerary = response.data.data[0];

            console.log("itinerary", itinerary, response);

            // parse JSON string to JSON
            const itineraryJSON = JSON.parse(itinerary.itinerary_description);

            // return itinerary data

            return itineraryJSON;
        } catch (error) {
            console.error("Error while fetching itinerary by id", error);
        }
    },

    // update itinerary
    updateItinerary: async (id, accessToken, isPublic, itinerary) => {

        // create a axios request to update the itinerary with respect to id
        try {
            await axios.put(
                `${baseUrl}/itinerary/update-itinerary/${id}/`,
                {
                    id: id,
                    name: itinerary["Title"],
                    itinerary_description: JSON.stringify(itinerary),
                    is_private: !isPublic,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        } catch (error) {
            console.error("Error while updating itinerary", error.response || error);
        }
    },

    // get public itineraries
    getPublicItineraries: async () => {
        // create a axios get request to get public itineraries
        try {
            const response = await axios.get(`${baseUrl}/itinerary/get-public-itineraries/`);

            // unpack the response
            const itineraries = response.data.data;

            return itineraries;

        } catch (error) {
            console.error("Error while fetching public itineraries", error)
        }
    },

    // delete itinerary
    deleteItinerary: async () => {
        try {
        } catch (error) {
            console.error("Something went wrong while deleting itinerary", error)
        }
    }
};
