import React from "react";

export interface IErrorTextProps {
    error: string;
}

export default function ErrorText({ error }: IErrorTextProps) {
    if (error === "") return null;

    return <small className="text-danger">{error}</small>;
}
