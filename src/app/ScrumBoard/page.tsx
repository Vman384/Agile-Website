"use client"
import { Card } from "react-bootstrap";
import IPageProps from "../../../interfaces/page";
import TaskCard from "../ScrumBoard/components/TaskCard";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import Columns from "./components/ListTasks";
import CreateTasks from "./components/CreateTasks";
import ListTasks from "./components/ListTasks";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";





function ScrumBoard() {
    const [tasks, setTasks] = useState([]);

    console.log("tasks", tasks);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks)
    }, []);

    return (
        <>
        <Toaster/>
        <div className="bg-slate-100 w-screen h-screen flex flex-col items-center pt-3 gap-16">
            <CreateTasks tasks={tasks} setTasks={setTasks} />
            <ListTasks tasks={tasks} setTasks={setTasks} />
        </div>
        </>
    )


}
export default ScrumBoard;

