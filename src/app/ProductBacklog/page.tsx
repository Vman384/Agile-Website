"use client"

import "../../../styles/product-backlog.css"
import BacklogTask from "../../../components/ProductBacklog/BacklogTask"
import { useState } from "react";
import React from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"


const startingTasks = [
    {
        id: "1",
        date: "22/04/2023",
        name: "John",
        role: "Dev",
        info: "Be able to move tasks from product backlog to the scrum bofasdfadfdsfa dfasdfad fsdf adsf da fadfas ard",
        priority: "2",
        sprint: "1",
        status: "In progress",
    },
    {
        id: "2",
        date: "23/04/2023",
        name: "Harry",
        role: "SM",
        info: "be able to add and remove columns on my scrum board",
        priority: "1",
        sprint: "1",
        status: "Started",
    },
    {
        id: "3",
        date: "26/04/2023",
        name: "Josh",
        role: "PO",
        info: "be able to assign one person to a task at a time",
        priority: "3",
        sprint: "2",
        status: "Done",
    },
];


export default function ProductBacklog() {
    

    const [taskList, setTaskList] = useState(startingTasks);
    
    return (
        <div>
            <div className="my-20 flex text-5xl font-extrabold justify-center items-center">
                Sunday.com
            </div>
            <div>
            {/* Header Row */}
            <div className = "flex text-center mx-10 h-fit text-2xl justify-center p-6">
                <div className = "normal-width">Date</div>
                <div className = "normal-width">Name</div>
                <div className = "normal-width">Role</div>
                <div className = "long-width">Info</div>
                <div className = "normal-width">Priority</div>
                <div className = "normal-width">Sprint</div>
                <div className = "normal-width">Status</div>
            </div>
            <DragDropContext onDragEnd={(results) => {
                const {source, destination, type} = results
                
                if (!destination) return
                if (source.index == destination.index) return

                if (type === "group") {
                    const reorderedTasks = [...taskList]
                    const sourceIndex = source.index
                    const destinationIndex = destination.index
                    
                    const [removedTask] = reorderedTasks.splice(sourceIndex, 1)
                    reorderedTasks.splice(destinationIndex, 0, removedTask)
                    
                    return setTaskList(reorderedTasks)
                }

            }}>
                <Droppable droppableId = "ProductBacklog" type = "group">
                    {(provided) => (
                        <div {...provided.droppableProps} ref = {provided.innerRef}>
                            {taskList.map((task : {id: string, date: string, name: string, role: string, info: string, priority: string, sprint: string, status: string}, index : number) => (
                                <Draggable draggableId = {task.id} key = {task.id} index = {index}>
                                    {(provided) => (
                                        <BacklogTask 
                                            date = {task.date}    
                                            name = {task.name}
                                            role = {task.role}
                                            info = {task.info}    
                                            priority = {task.priority}
                                            sprint = {task.sprint}    
                                            status = {task.status}
                                            provided = {provided}
                                            >
                                        </BacklogTask>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            </div>
        </div>
    );
}
