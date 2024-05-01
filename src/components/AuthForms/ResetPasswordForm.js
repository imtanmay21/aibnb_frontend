import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authQueries } from "../../api/authQueries";
import LargeHeading from "../Texts/LargeHeading";
import TextBox from "../Inputs/TextBox";
import Button from "../Buttons/Button";

function ResetPasswordForm() {
    // STATES
    const [email, setEmail] = useState("");

    // HOOKS
    const navigate = useNavigate();

    // Function to send reset password email
    const sendResetPasswordEmail = async () => {
        // Send the email
        await authQueries.sendResetPasswordEmail(email);
    };

    return (
        <div className="space-y-7 w-[60%]">
            {/* Form heading */}
            <div className="space-y-7">
                <div>
                    {/* Heading for the form */}
                    <LargeHeading>RESET PASSWORD</LargeHeading>
                </div>
            </div>

            {/* Inputs */}
            <div>
                <TextBox
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>

            {/* Buttons */}
            <div className="flex-col flex space-y-5">
                <Button onClick={sendResetPasswordEmail} label="SEND EMAIL" />
                <Button label="Back" />
            </div>
        </div>
    );
}

export default ResetPasswordForm;
