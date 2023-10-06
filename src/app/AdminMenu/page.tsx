import CardList from "../../../components/Menu/CardList";

export default function Menu() {
    const cards = [
        {
            id: 1,
            text: "Create User",
            description:
                "Go here to create a user",
        },
        {
            id: 2,
            text: "Time sheet",
            description:
                "To see the time recorded by each user as a graph",
        },
    ];

    return (
        <div>
            <div className="my-20 flex text-5xl font-extrabold justify-center items-center">
                Sunday.com
            </div>
            <CardList cards={cards} />
        </div>
    );
}
