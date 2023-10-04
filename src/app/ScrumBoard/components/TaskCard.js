import CardButton from "./TaskCardButton";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';


const TaskCard = (props) => {
    const { data, index } = props;
  
    if (!data || !data.text) {
      return null; // Handle the case where data is undefined or does not have a text property
    }
  
    return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
        >
          <label
            className={`bg-gradient-to-r
              px-2 py-1 rounded text-white text-sm
              ${
                data.priority === 0
                  ? "from-blue-600 to-blue-400"
                  : data.priority === 1
                  ? "from-green-600 to-green-400"
                  : "from-red-600 to-red-400"
              }
              `}
          >
            {data.priority === 0
              ? "Low Priority"
              : data.priority === 1
              ? "Medium Priority"
              : "High Priority"}
          </label>
      <div className="block w-100 mx-10 h-fit m-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h2 className="text-2xl flex m-auto dark:text-white">{data.text}</h2>
        <p className="m-auto text-gray-500 dark:text-gray-400">{data.description}</p>
        <CardButton card={data} />
      </div>
      </div>
      )}
     </Draggable>
)
            }
export default TaskCard;  