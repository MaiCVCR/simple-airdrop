import React from "react";

const Button = ({
    children,
    onClick,
    className,
    disabled = false,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;