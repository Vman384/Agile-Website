import CardButton from "./TaskCardButton";

const TaskCard = ({ task }) => {
    return (
        <div className="block w-100 mx-10 h-fit m-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h2 className="text-2xl  flex m-auto dark:text-white">{task.text}</h2>
            <p className="m-auto  text-gray-500 dark:text-gray-400">{task.description}</p>
            <CardButton card={task} />
        </div>
    );
};

export default TaskCard;
