import CardButton from "./CardButton";

export default function Card({
    card,
}: {
    card: { id: number; text: string; description: string };
}) {
    return (
        <div className="block w-1/3 mx-10 h-fit justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:border-white">
            <h2 className="text-4xl m-10 flex justify-center dark:text-black">
                {card.text}
            </h2>
            <p className="m-10 text-gray-500 dark:text-gray-400">
                {card.description}
            </p>
            <CardButton card={card} />
        </div>
    );
}
