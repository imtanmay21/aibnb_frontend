import { userActionTypes } from "./UserActionTypes";

// initial state for user auth
const initialState = {
    accessToken: "",
    refreshToken: "",
    profileData: null,
};

// user reducer
export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionTypes.SET_ACCESS_TOKEN: {
            // get access token
            const { accessToken } = action.payload;

            // set access token to the user state
            return {
                ...state,
                accessToken: accessToken,
            };
        }

        case userActionTypes.SET_REFRESH_TOKEN: {
            // get refresh token
            const { refreshToken } = action.payload;
            // set refresh token to the user state
            return {
                ...state,
                refreshToken: refreshToken,
            };
        }
        case userActionTypes.SET_USER_DETAILS:
            return {
                ...state,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
            };

        case userActionTypes.SET_PROFILE_DATA: {
            // get profile data
            const { profileData } = action.payload;
            // set the profile data to the user state
            return {
                ...state,
                profileData: profileData,
            };
        }
        case userActionTypes.LOGOUT_USER:
            return {
                ...state,
                accessToken: null, // Setting accessToken to null
                profileData: null,
            };

        default: {
            return state;
        }
    }
};
