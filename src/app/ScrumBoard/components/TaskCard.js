import CardButton from "./TaskCardButton"

const TaskCard = ({ card}) => {
    return (
        <div className = "block w-100 mx-10 h-fit m-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h2 className = "text-4xl m-10 flex m-auto dark:text-white">{card.text}</h2>
            {/* <p className = "m-10 text-gray-500 dark:text-gray-400">{card.description}</p> */}
            <CardButton card={card}/>
        </div>
    )
}

export default TaskCard