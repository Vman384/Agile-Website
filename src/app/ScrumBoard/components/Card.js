import CardButton from "./TaskCardButton";

export default function Card({ card }) {
    return (
        <div className="block w-1/3 mx-10 h-fit justify-center p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h2 className="text-4xl m-10 flex justify-center dark:text-white">
                {card.text}
            </h2>
            <p className="m-10 text-gray-500 dark:text-gray-400">
                {card.description}
            </p>
            <CardButton card={card} />
        </div>
    );
}
