import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const fTodos = tasks.filter((task) => task.status === "todo");
      const fInProgress = tasks.filter((task) => task.status === "inprogress");
      const fClosed = tasks.filter((task) => task.status === "closed");

      setTodos(fTodos);
      setInProgress(fInProgress);
      setClosed(fClosed);
    }
  }, [tasks])

  const statuses = ["todo","inprogress", "closed"];

  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <Section 
        key={index} 
        status={status}
        tasks = {tasks}
        setTasks={setTasks}
        todos={todos}
        inProgress={inProgress}
        closed={closed}
         />
      ))}
    </div>
  );
};

export default ListTasks;

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  let text = "To do"
  let bg = `shadow ${status === "todo" ? "dark:bg-gray-800" : ""}`;
  let tasksToMap = todos

  if(status === "inprogress"){
    text = "In Progress"
    bg = `shadow ${status === "inProgress" ? "dark:bg-gray-800" : ""}`;
    tasksToMap = inProgress
  }

  if(status === "closed"){
    text = "Closed"
    bg = `shadow ${status === "closed" ? "dark:bg-gray-800" : ""}`;
    tasksToMap = closed;
  }


  return (
    <div>
      <Header text={text} bg={bg} count={tasksToMap.length}/> 
      {tasksToMap.length > 0 && tasksToMap.map(tasks => <Task key={tasks.id}
      task ={task} tasks={tasks} setTasks={setTasks}/>)}
    </div>
  )
}

const Header = ({ text, bg, count }) => {
  return (
  <div className={'{bg} text-3xl w-max m-auto'}>
    {text}{" "}
    <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center'>
      {count}
    </div>
    </div>
  )
}



const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  }));




  const handleRemove = (id) => {
    console.log(id)

    const fTasks = tasks.filter((t) => t.id !== id);

    localStorage.setItem("tasks", JSON.stringify(fTasks))
    setTasks(fTasks)

    toast("Task removed", {icon: "-"})
  };

  return (
  <div className={'relative p-4 mt-8 shadow-md rounded-md cursor-grab'}>
    <p>{task.name}</p>
    <button className="absolute bottom-1 right-1 text-slate-400"
    onClick={() => handleRemove(tasks.id)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
        >
          <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
      </svg>
    </button>
    </div>
  )
}