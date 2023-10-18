"use client";
import { Card } from "react-bootstrap";
import IPageProps from "../../../interfaces/page";
import TaskCard from "../ScrumBoard/components/TaskCard";
import { useState, useEffect } from "react";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import BoardData from "./data/board-data.json";
import Link from "next/link";
import Image from "next/image";
// import {
//     ChevronDownIcon,
//     PlusIcon,
//     DotsVerticalIcon,
//     PlusCircleIcon,
//   } from "@heroicons/react/outline";
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
import JSConfetti from "js-confetti";

function createGuidId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
}

function getData() {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let tasksArr: typeof BoardData = [];

        querySnapshot.forEach((doc: any) => {
            tasksArr.push({ ...doc.data(), id: doc.id });
        });
        ``;

        // tech debt quick fix
        for (const element of tasksArr) {
            //console.log(`the current status: ${tasksArr[i].status}`)
            // console.log(BoardData[0].items)
            if (element.status == "Backlog") {
                BoardData[0].items.push({
                    id: element.id,
                    priority: element.estimate,
                    text: element.type,
                    description: element.info,
                });

                // Quick fix to duplicate items (hahahaha we are in so much technical debt i want to die)
                //                                          This is the way ^~~~~~~~~~~~~~
                const ids = BoardData[0].items.map(({ id }) => id);
                BoardData[0].items = BoardData[0].items.filter(
                    ({ id }, index) => !ids.includes(id, index + 1)
                );
            } else if (element.status == "To-Do") {
                BoardData[1].items.push({
                    id: element.id,
                    priority: element.estimate,
                    text: element.type,
                    description: element.info,
                });
                const ids = BoardData[1].items.map(({ id }) => id);
                BoardData[1].items = BoardData[1].items.filter(
                    ({ id }, index) => !ids.includes(id, index + 1)
                );
            } else if (element.status == "In Progress") {
                BoardData[2].items.push({
                    id: element.id,
                    priority: element.estimate,
                    text: element.type,
                    description: element.info,
                });
                const ids = BoardData[2].items.map(({ id }) => id);
                BoardData[2].items = BoardData[2].items.filter(
                    ({ id }, index) => !ids.includes(id, index + 1)
                );
            } else if (element.status == "Review") {
                BoardData[3].items.push({
                    id: element.id,
                    priority: element.estimate,
                    text: element.type,
                    description: element.info,
                });
                const ids = BoardData[3].items.map(({ id }) => id);
                BoardData[3].items = BoardData[3].items.filter(
                    ({ id }, index) => !ids.includes(id, index + 1)
                );
            } else if (element.status == "Done") {
                BoardData[4].items.push({
                    id: element.id,
                    priority: element.estimate,

                    text: element.type,
                    description: element.info,
                });
                const ids = BoardData[3].items.map(({ id }) => id);
                BoardData[3].items = BoardData[3].items.filter(
                    ({ id }, index) => !ids.includes(id, index + 1)
                );
            }
        }
    });
    return BoardData;
}

export default function Home() {
    const [ready, setReady] = useState(false);
    const [boardData, setBoardData] = useState(BoardData);
    const [showForm, setShowForm] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(0);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        if (process.browser) {
            setReady(true);
        }

        setBoardData(getData());
        console.log(boardData);

        forceUpdate();
    }, [boardData]);

    const onDragEnd = (re) => {
        if (!re.destination) return;

        // Code for user empowerment (when a task is dragged to done)
        if (re.destination.droppableId == 4) {
            const canvas = document.querySelector("#canvas");
            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti();
            jsConfetti.addConfetti();
        }

        let newBoardData = boardData;
        var dragItem =
            newBoardData[parseInt(re.source.droppableId)].items[
                re.source.index
            ];
        newBoardData[parseInt(re.source.droppableId)].items.splice(
            re.source.index,
            1
        );
        newBoardData[parseInt(re.destination.droppableId)].items.splice(
            re.destination.index,
            0,
            dragItem
        );

        setBoardData(newBoardData);

        var Ref = doc(db, "tasks", dragItem.id);
        console.log(dragItem.id);
        console.log(re.destination.droppableId);
        console.log(Ref);

        const col = ["Backlog", "To-Do", "In Progress", "Review", "Done"];

        updateDoc(Ref, {
            status: col[re.destination.droppableId],
        });
    };

    return (
        <div>
            <div className="mt-8 mb-5 mx-5 flex">
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

                <button
                    className="my-2 flex items-center w-8 h-8 justify-center"
                    style={{
                        position: "absolute",
                        top: "50px",
                        right: "80px",
                    }}
                    title="Added item"
                >
                    +{/* <PlusIcon className="w-10 h-10 text-gray-500" /> */}
                </button>
            </div>
            {/* Number of items in board: {boardData[0].items.length+  boardData[1].items.length + boardData[2].items.length +boardData[3].items.length} */}
            {boardData[0].items.length +
                boardData[1].items.length +
                boardData[2].items.length +
                boardData[3].items.length +
                +boardData[4].items.length ==
            0 ? (
                <button className="dark:text-white" onClick={forceUpdate}>
                    See Scrum Board!
                </button>
            ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="grid grid-cols-5 gap-5 my-5">
                        {boardData.map((board, bIndex) => {
                            return (
                                <div key={board.name}>
                                    <Droppable droppableId={bIndex.toString()}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                <div
                                                    className={`bg-gray-100 rounded-md shadow-md
                              flex flex-col relative overflow-hidden
                              ${snapshot.isDraggingOver && "bg-gray-100"}`}
                                                >
                                                    <span
                                                        className="w-full h-1 bg-gradient-to-r from-gray-800 to-gray-400
                            absolute inset-x-0 top-0"
                                                    ></span>
                                                    <h4 className=" p-3 flex justify-between items-center mb-2">
                                                        <span className="text-2xl text-gray-600">
                                                            {board.name}
                                                        </span>
                                                        <h3 className="w-5 h-5 text-gray-500">
                                                            ...
                                                        </h3>
                                                    </h4>

                                                    <div
                                                        className="overflow-y-auto overflow-x-hidden h-auto"
                                                        style={{
                                                            maxHeight:
                                                                "calc(100vh - 290px)",
                                                        }}
                                                    >
                                                        {board.items.length >
                                                            0 &&
                                                            board.items.map(
                                                                (
                                                                    item,
                                                                    iIndex
                                                                ) => {
                                                                    return (
                                                                        <TaskCard
                                                                            key={
                                                                                item.id
                                                                            }
                                                                            data={
                                                                                item
                                                                            }
                                                                            index={
                                                                                iIndex
                                                                            }
                                                                            className="m-3"
                                                                        />
                                                                    );
                                                                }
                                                            )}
                                                        {provided.placeholder}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            );
                        })}
                    </div>
                </DragDropContext>
            )}
        </div>
    );
}
