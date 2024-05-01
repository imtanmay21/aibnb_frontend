import axios from "axios";
import { baseUrl } from "./baseUrl";
import { userActionTypes } from "../store/UserReducer/UserActionTypes";

// Object for handling auth queries
export const authQueries = {
    // register user
    registerUser: async (
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        phone,
        dispatch
    ) => {
        // user data to be sent (request body)
        const userData = {
            email: email,
            password: password,
            password2: confirmPassword,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
        };

        try {
            // post the request body to the register endpoint
            const response = await axios.post(
                `${baseUrl}/auth/register/`,
                userData
            );
            // unpack access token and refresh token
            const { access, refresh } = response.data.data.token;
            // set access and refresh token to the user auth store
            dispatch({
                type: userActionTypes.SET_ACCESS_TOKEN,
                payload: { accessToken: access },
            });
            dispatch({
                type: userActionTypes.SET_REFRESH_TOKEN,
                payload: { refreshToken: refresh },
            });

            //

            // return true to indicate that user has registered succesfully
            return true;
        } catch (error) {
            return error;
        }
    },

    // login user
    loginUser: async (email, password, dispatch) => {
        // user data to be sent (request body)
        const userData = {
            email: email,
            password: password,
        };

        try {
            // post the request body to the login endpoint
            const response = await axios.post(
                `${baseUrl}/auth/login/`,
                userData
            );
            // unpack the access and refresh token
            const { access, refresh } = response.data.token;
            // set access and refresh token to the user auth store
            dispatch({
                type: userActionTypes.SET_ACCESS_TOKEN,
                payload: { accessToken: access },
            });
            dispatch({
                type: userActionTypes.SET_REFRESH_TOKEN,
                payload: { refreshToken: refresh },
            });

            // return true to indicate that user has logged in succesfully
            return true;
        } catch (error) {
            return error;
        }
    },

    // get profile
    getProfile: async (accessToken, dispatch) => {
        // If profile data is not present in redux
        try {
            // pass the access token in the authorization header
            const response = await axios.get(`${baseUrl}/auth/profile/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // get profile data
            const profileData = response.data.data;

            // dispatch the response data to redux
            dispatch({
                type: userActionTypes.SET_PROFILE_DATA,
                payload: { profileData: profileData },
            });
        } catch (error) {
            console.error("Error while fetching getting profile", error);
        }
    },

    // function to logout the user
    logoutUser: (dispatch) => {
        // flush the tokens
        dispatch({
            type: userActionTypes.LOGOUT_USER,
        });
    },

    // function to send a reset password email
    sendResetPasswordEmail: async (email) => {
        // create a post request to send a reset password email
        try {
            await axios.post(`${baseUrl}/auth/send-password-reset-email/`, {
                email: email,
            });
        } catch (error) {
            console.log("Something went wrong during sending email", error);
        }
    },

    // function to send verification email
    sendVerificationEmail: async (email) => {
        // create a post request to send a verification email
        try {
            await axios.post(`${baseUrl}/auth/verify-user/`, {
                email: email,
            });
        } catch (error) {
            console.log("Error while sending email for verification", error);
        }
    },

    // function to reset password
    resetPassword: async (newPassword, accessToken, uid) => {
        // create a post request to reset the password
        try {
            console.log(newPassword, accessToken, uid)

            await axios.post(
                `${baseUrl}/auth/reset-password/${uid}/${accessToken}/`,
                {
                    password: newPassword,
                    password2: newPassword,
                },
            );
        } catch (error) {
            console.log("error", error);
        }
    },
    // function to delete user
    deleteUser: async (accessToken) => {
        try {
            await axios.post(
                `${baseUrl}/auth/delete-user/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        } catch (error) {
            console.error("Something went wrong while deleting user", error);
        }
    },
};
