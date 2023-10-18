import React from "react";
import Image from "next/image";

export default function PBacklog_pic() {
    return (
        <section className="w-full mx-auto">
            <Image
                className="border-2 border-black mx-auto mt-2"
                src="/product-backlog.png"
                width={950}
                height={400}
                priority
                alt="Product Backlog example picture"
            />
        </section>
    );
}
