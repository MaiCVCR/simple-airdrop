import React from "react";

const Card = ({
    title,
    description,
    children,
    className,
}: {
    title?: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={`border rounded-lg shadow-md p-4 bg-white ${className}`}>
            {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
            {description && <p className="text-gray-600 mb-4">{description}</p>}
            {children}
        </div>
    );
};

export default Card;
