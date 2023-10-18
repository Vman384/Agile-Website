import CardButton from "./TaskCardButton";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';


const TaskCard = (props) => {
    const { data, index } = props;
  
    if (!data || !data.text) {
      return null; // Handle the case where data is undefined or does not have a text property
    }
    
    console.log(data)
  
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
                data.priority === 3
                  ? "from-blue-600 to-blue-400"
                  : data.priority === 4
                  ? "from-green-600 to-green-400"
                  : "from-red-600 to-red-400"
              }
              `}
          >
            {data.priority === 3
              ? "Low Priority"
              : data.priority === 4
              ? "Medium Priority"
              : "High Priority"}
          </label>
      <div className="block w-100 mx-10 h-fit m-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h2 className="text-xl dark:text-white"
          style={{fontWeight: "bold"}}
        >{data.name}</h2>
        <p className="m-auto text-black-500 dark:text-gray-400">{data.description}</p>
        <p className="m-auto text-gray-500 dark:text-gray-400">{data.tag}</p>
        <p className="m-auto text-gray-500 dark:text-gray-400"
        style={{position:'relative',bottom: -10, left: 0, width: '24px', // Adjust the width and height to create a circle
        height: '24px',
        borderRadius: '50%', // This creates the circular shape
        backgroundColor: 'gray', // Change this to the desired background color
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold'}}
        >{data.priority}</p>
      </div>
      </div>
      )}
     </Draggable>
)
            }
export default TaskCard;  