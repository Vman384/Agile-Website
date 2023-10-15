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
import Link from "next/link";
import Image from "next/image";

export default function ProductBacklog() {
    // Read items from the database
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "tasks"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let tasksArr: typeof taskList = [];

            querySnapshot.forEach((doc: any) => {
                tasksArr.push({ ...doc.data(), id: doc.id });
            });
            setTaskList(tasksArr);

            return () => unsubscribe;
=======
            console.log("printing tasksArr")
            console.log(tasksArr)
            console.log("printing taskList")

            console.log(taskList)
>>>>>>> Stashed changes
        });
        return () => unsubscribe;
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
            <div className="mt-8 mb-5 justify-center mx-5 flex">
                <Link href="/Menu" title="Back to Menu">
                    <Image
                        className="hidden dark:block"
                        priority
                        src="/named-logo-light-text.png"
                        height={88}
                        width={250}
                        alt="Sunday.com logo"
                    />

                    <Image
                        className="block dark:hidden"
                        priority
                        src="/named-logo-dark-text.png"
                        height={88}
                        width={250}
                        alt="Sunday.com logo"
                    />
                </Link>
            </div>
            <div>
                {/* Header Row */}
                <div className="flex text-center mx-10 h-fit text-2xl justify-center p-6 text-black dark:text-white">
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
                                            tag: string;
                                            info: string;
                                            estimate: number;
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
                                                    info={task.info}
                                                    estimate={task.estimate}
                                                    tag={task.tag}
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
            <Link href={"/TaskCreation"}>
                <button className="mx-16 my-4 py-2 px-4 w-11/12 items-center bg-green-500 hover:bg-green-400 focus:ring-green-100 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    (+) Add New Task
                </button>
            </Link>
        </div>
    );
}
