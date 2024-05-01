import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authQueries } from "../../api/authQueries";
import TextBox from "../Inputs/TextBox";
import Button from "../Buttons/Button";
import LargeHeading from "../Texts/LargeHeading";

function SignupForm({ showLoginForm, token }) {
    // STATES
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("12345");

    // HOOKS
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function to handle signup
    const onSignup = async () => {
        // send verification email
        await authQueries.sendVerificationEmail(email);

        // Set user data to local storage
        localStorage.setItem(
            "userData",
            JSON.stringify({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                confirmPassword: confirmPassword,
                phone: phone,
            })
        );
    };

    // function to reset the states
    const resetStates = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    // function to register user
    const registerUser = async () => {
        // get user data
        const userDataString = localStorage.getItem("userData");
        // parse the json string
        const userData = JSON.parse(userDataString);

        console.log("user data", userData);

        const isUserRegistered = await authQueries.registerUser(
            userData.email,
            userData.password,
            userData.confirmPassword,
            userData.firstName,
            userData.lastName,
            userData.phone,
            dispatch
        );

        // if user has registered
        if (isUserRegistered === true) {
            navigate("/dashboard");
        } else {
            // reset all states
            resetStates();
        }
    };

    useEffect(() => {
        if (token) {
            registerUser();
        }
    }, []);

    return (
        <div className="space-y-7 flex flex-col w-[50%]">
            {/* Form heading */}
            <div className="space-y-3">
                <div>
                    {/* Heading for the form */}
                    <LargeHeading>SIGN UP</LargeHeading>
                </div>

                {/* Caption */}
                <div>
                    <span className="text-gray-300">
                        Hello there! Let's create your account.
                    </span>
                </div>
            </div>

            {/* Input boxes */}
            <div className="space-y-7">
                {/* First Name & Last Name */}
                <div>
                    <TextBox
                        placeholder="First Name"
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <TextBox
                        placeholder="Last Name"
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                {/* Email address */}
                <div>
                    <TextBox
                        placeholder="Email address"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div>
                    <TextBox
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <TextBox
                        placeholder="Confirm Password"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {/* Terms of Service and policy section */}
                <div className="flex items-center space-x-3">
                    <input type="checkbox" />
                    <span className="text-md text-gray-300">
                        I agree to the{" "}
                        <button className="text-blue-500">
                            Terms of Service
                        </button>{" "}
                        and{" "}
                        <button className="text-blue-500">
                            Privacy Policy
                        </button>
                    </span>
                </div>

                {/* Sign up button */}
                <div className="flex flex-row">
                    <Button label="Signup" onClick={onSignup} />
                </div>

                {/* Log In Link */}
                <div className="text-center">
                    <span className="text-md text-white">
                        Joined us before?{" "}
                        <button
                            onClick={showLoginForm}
                            className="text-blue-500"
                        >
                            Log In
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
