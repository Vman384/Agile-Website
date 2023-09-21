import Card from "./Card";

export default function CardList({
    cards,
}: {
    cards: { id: number; text: string; description: string }[];
}) {
    return (
        <div className="flex flex-row justify-center h-full">
            {cards.map((card) => (
                <Card key={card.id} card={card} />
            ))}
        </div>
    );
}
