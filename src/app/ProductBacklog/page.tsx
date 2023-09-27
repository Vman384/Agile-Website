"use client";

import "../../../styles/product-backlog.css";
import BacklogTask from "../../../components/ProductBacklog/BacklogTask";
import { useState } from "react";
import React, { usestate, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { stat } from "fs";
import {
    collection,
    addDoc,
    getDocs,
    querySnapshot,
    query,
    onSnapshot,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../../../config/firebaseSetup";

const startingTasks = [
    {
        id: "1",
        date: "22/04/2023",
        name: "John",
        role: "Dev",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consequat at mauris vel volutpat. Duis viverra diam turpis, a aliquam justo maximus ac. ",
        estimate: "2",
        // sprint: "1",
        status: "In progress",
    },
    {
        id: "2",
        date: "23/04/2023",
        name: "Harry",
        role: "SM",
        info: "Donec ac sagittis velit. Sed sit amet rhoncus nisl. Pellentesque posuere ultrices quam ut facilisis. Vivamus sagittis non ligula ut tempor.",
        estimate: "1",
        // sprint: "1",
        status: "Started",
    },
    {
        id: "3",
        date: "26/04/2023",
        name: "Josh",
        role: "PO",
        info: "Sed maximus maximus diam at facilisis. Sed egestas mauris eu velit blandit venenatis.",
        estimate: "3",
        // sprint: "2",
        status: "Done",
    },
];

export default function ProductBacklog() {
    // Read items from the database
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "tasks"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
           let tasksArr: (typeof taskList) = [];

            querySnapshot.forEach((doc: any) => {
                tasksArr.push({ ...doc.data(), id: doc.id });
            });
            setTaskList(tasksArr);
            console.log("printing tasksArr")
            console.log(tasksArr)
            console.log("printing taskList")

            console.log(taskList)
            return () => unsubscribe;
        });
    }, []);

    function taskChanged(
        id: string,
        date: string,
        name: string,
        role: string,
        info: string,
        estimate: string,
        sprint: string,
        status: string
    ) {
        const indexOfTask = taskList.findIndex((task) => task.id === id);
        if (
            !(
                taskList[indexOfTask].id == id &&
                taskList[indexOfTask].date == date &&
                taskList[indexOfTask].name == name &&
                taskList[indexOfTask].role == role &&
                taskList[indexOfTask].info == info &&
                taskList[indexOfTask].estimate == estimate &&
                taskList[indexOfTask].sprint == sprint &&
                taskList[indexOfTask].status == status
            )
        ) {
            taskList[indexOfTask] = {
                id: id,
                date: date,
                name: name,
                role: role,
                info: info,
                estimate: estimate,
                sprint: sprint,
                status: status,
            };
            console.log("changed");
            console.log(taskList);
        }
    }

    return (
        <div>
            <div className="my-20 flex text-5xl font-extrabold justify-center items-center">
                Sunday.com
            </div>
            <div>
                {/* Header Row */}
                <div className="flex text-center mx-10 h-fit text-2xl justify-center p-6">
                    <div className="normal-width">Date</div>
                    <div className="normal-width">Name</div>
                    <div className="normal-width">Type</div>
                    <div className="long-width">Info</div>
                    <div className="normal-width">Estimate</div>
                    <div className="normal-width">Tag</div>
                    <div className="normal-width">Status</div>
                </div>
                <DragDropContext
                    onDragEnd={(results) => {
                        const { source, destination, type } = results;

                        if (!destination) return;
                        if (source.index == destination.index) return;

                        if (type === "group") {
                            const reorderedTasks = [...taskList];
                            const sourceIndex = source.index;
                            const destinationIndex = destination.index;

                            const [removedTask] = reorderedTasks.splice(
                                sourceIndex,
                                1
                            );
                            reorderedTasks.splice(
                                destinationIndex,
                                0,
                                removedTask
                            );

                            return setTaskList(reorderedTasks);
                        }
                    }}
                >
                    <Droppable droppableId="ProductBacklog" type="group">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {taskList.map(
                                    (
                                        task: {
                                            id: string;
                                            date: string;
                                            name: string;
                                            type: string;
                                            sprint: string;
                                            info: string;
                                            estimate: string;
                                            status: string;
                                        },
                                        index: number
                                    ) => (
                                        <Draggable
                                            draggableId={task.id}
                                            key={task.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <BacklogTask
                                                    id={task.id}
                                                    date={task.date}
                                                    name={task.name}
                                                    type={task.type}
                                                    sprint={task.sprint}
                                                    info={task.info}
                                                    estimate={task.estimate}
                                                    status={task.status}
                                                    taskChanged={taskChanged}
                                                    provided={provided}
                                                ></BacklogTask>
                                            )}
                                        </Draggable>
                                    )
                                )}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
}
