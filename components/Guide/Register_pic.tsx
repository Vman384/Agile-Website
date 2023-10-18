import React from "react";
import Image from "next/image";

export default function Register_pic() {
    return (
        <section className="w-full mx-auto">
            <Image
                className="border-2 border-black mx-auto mt-2"
                src="/register.png"
                width={250}
                height={250}
                priority
                alt="Register example picture"
            />
        </section>
    );
}
