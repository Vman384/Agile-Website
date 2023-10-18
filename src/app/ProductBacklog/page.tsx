"use client";

import "../../../styles/product-backlog.css";
import BacklogTask from "../../../components/ProductBacklog/BacklogTask";
import { useState } from "react";
import React, { useCallback, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { stat } from "fs";
import Link from "next/link";
import Image from "next/image";
import {
    collection,
    addDoc,
    setDoc,
    updateDoc,
    getDocs,
    querySnapshot,
    query,
    onSnapshot,
    onValue,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../../../config/firebaseSetup";
import { Tag } from "reactstrap";

export default function ProductBacklog() {
    // Read items from the database
    const [taskList, setTaskList] = useState([]);
    const forceUpdate = useCallback(
        (taskListArg: any) => setTaskList(taskListArg),
        []
    );

    useEffect(() => {
        const q = query(collection(db, "tasks"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let tasksArr: typeof taskList = [];

            querySnapshot.forEach((doc: any) => {
                console.log(doc.data(), "hi");
                tasksArr.push({ ...doc.data(), id: doc.id });
                // if (taskList.length != 0) {
                //     // Sort array by the order of taskList
                //     let newTaskList = []
                //     for(let task in tasksArr){
                //         // Get task index of this task
                //         let taskIndex = 0
                //         while (taskIndex < taskList.length){
                //             if (task.id == taskList[taskIndex].id) {
                //                 break
                //             }
                //             taskIndex += 1
                //         }
                //         newTaskList[taskIndex] = task
                //     }
                //     tasksArr = newTaskList
                // }
            });
            setTaskList(tasksArr);

            return () => unsubscribe;
        });
    }, []);

    async function taskChanged(
        id: string,
        date: string,
        name: string,
        type: string,
        info: string,
        estimate: string,
        tag: string,
        status: string,
        priority: number
    ) {
        const indexOfTask = taskList.findIndex((task) => task.id === id);
        if (
            !(
                taskList[indexOfTask].id == id &&
                taskList[indexOfTask].date == date &&
                taskList[indexOfTask].name == name &&
                taskList[indexOfTask].type == type &&
                taskList[indexOfTask].info == info &&
                taskList[indexOfTask].estimate == estimate &&
                taskList[indexOfTask].tag == tag &&
                taskList[indexOfTask].status == status &&
                taskList[indexOfTask].priority == priority
            )
        ) {
            taskList[indexOfTask] = {
                id: id,
                date: date,
                name: name,
                type: type,
                info: info,
                estimate: estimate,
                tag: tag,
                status: status,
                priority: priority,
            };
            const idName = taskList[indexOfTask].id;
            console.log(idName);
            const taskRef = doc(db, "tasks", idName);
            await updateDoc(taskRef, {
                id: id,
                date: date,
                name: name,
                type: type,
                info: info,
                estimate: estimate,
                tag: tag,
                status: status,
                priority: priority,
            });
            sortByPriority();
            // onSnapshot(taskRef, (doc) => {
            //     console.log(doc.data())
            // })
            // console.log("changed");
            // console.log(taskList);
        }
    }

    async function taskRemoved(id) {
        // Find index of that id
        const taskRef = doc(db, "tasks", id);
        let taskIndex = 0;
        while (taskIndex < taskList.length) {
            if (taskList[taskIndex].id == id) {
                break;
            }
            taskIndex += 1;
        }
        console.log(taskIndex);
        if (taskIndex != 0) {
            setTaskList(
                taskList.splice(0, taskIndex).concat(taskList.splice(taskIndex))
            );
        } else {
            setTaskList(taskList.splice(1));
        }
        await deleteDoc(taskRef);
    }

    function sortByPriority() {
        let newTaskList = [...taskList];
        newTaskList.sort((a, b) => (a.priority > b.priority ? 1 : -1));
        forceUpdate(newTaskList);
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
                <div className="flex text-center mx-10 h-fit text-2xl justify-center p-6">
                    <div className="normal-width dark:text-white">Date</div>
                    <div className="normal-width dark:text-white">Name</div>
                    <div className="normal-width dark:text-white">Type</div>
                    <div className="long-width dark:text-white">Info</div>
                    <div className="normal-width dark:text-white">Estimate</div>
                    <div className="normal-width dark:text-white">Tag</div>
                    <div className="normal-width dark:text-white">Status</div>
                    <div className="priority dark:text-white">
                        <button onClick={sortByPriority}>↕</button> Priority
                    </div>
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
                                            info: string;
                                            estimate: number;
                                            tag: string;
                                            status: string;
                                            priority: number;
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
                                                    priority={task.priority}
                                                    taskChanged={taskChanged}
                                                    taskRemoved={taskRemoved}
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
                <button className="mt-4 py-2 px-4 bg-gray-800 hover:bg-gray-700 focus:ring-gray-100 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    (+) Add New Task
                </button>
            </Link>
        </div>
    );
}
