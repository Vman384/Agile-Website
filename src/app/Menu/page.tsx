import Image from "next/image";

import CardList from "../../../components/Menu/CardList";

export default function Menu() {
    const cards = [
        {
            id: 1,
            text: "Scrum Board",
            description:
                "This is a small little paragraph about the scrum board and what it does",
        },
        {
            id: 2,
            text: "Product Backlog",
            description:
                "This is a small little paragraph about the product backlog and what it does",
        },
        {
            id: 2,
            text: "Time sheet Entry",
            description:
                "Enter you hours worked here",
        },
    ];

    return (
        <div className="flex justify-center items-center">
            <div className="mt-8 mb-5 justify-center mx-5 flex">
                <Image
                    className="hidden dark:block"
                    priority
                    src="/named-logo-light-text.png"
                    height={88}
                    width={250}
                    alt="Sunday.com logo"
                />

                <Image
                    className="block dark:hidden"
                    priority
                    src="/named-logo-dark-text.png"
                    height={88}
                    width={250}
                    alt="Sunday.com logo"
                />
            </div>
            <div
                className="flex mx-5"
                style={{
                    position: "absolute",
                    top: "120px",
                }}
            >
                <CardList cards={cards} />
            </div>
        </div>
    );
}
