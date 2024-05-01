import React from "react";

function TextBox({
    placeholder,
    value,
    onChange,
    type,
    rightIcon,
    onClickIcon,
}) {
    return (
        <div className="flex flex-row items-end space-x-3 relative">
            <input
                className="flex flex-1 h-[50px] p-4 bg-transparent text-white outline-none border-b-2 border-white  w-[100%]"
                type={type}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            />
            {rightIcon && (
                <button
                    onClick={onClickIcon}
                    className="flex flex-[0.05] absolute right-0 top-3"
                >
                    {rightIcon}
                </button>
            )}
        </div>
    );
}

export default TextBox;
