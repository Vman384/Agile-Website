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
