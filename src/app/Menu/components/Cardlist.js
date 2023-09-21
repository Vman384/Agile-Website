import Card from "./Card";

export default function Cardlist({ cards }) {
    return (
        <div className="flex flex-row justify-center h-full">
            {cards.map((card) => (
                <Card key={card.id} card={card} />
            ))}
        </div>
    );
}
