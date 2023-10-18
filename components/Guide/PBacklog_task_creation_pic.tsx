import React from "react";
import Image from "next/image";

export default function PBacklog_task_creation_pic() {
    return (
        <section className="w-full mx-auto">
            <Image
                className="border-2 border-black mx-auto mt-2"
                src="/product-backlog-task-creation.png"
                width={350}
                height={350}
                priority
                alt="Product Backlog new task creation example picture"
            />
        </section>
    );
}
