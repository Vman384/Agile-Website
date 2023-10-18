import CardList from "../../../components/Menu/CardList";
import Image from "next/image";

export default function Menu() {
    const cards = [
        {
            id: 1,
            text: "Create User",
            description: "Go here to create a user",
        },
        {
            id: 2,
            text: "Time sheet",
            description: "To see the time recorded by each user as a graph",
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
            <CardList cards={cards} />
        </div>
    );
}
