"use client";
import { Card } from "react-bootstrap";
import IPageProps from "../../../interfaces/page";
import TaskCard from "../ScrumBoard/components/TaskCard";
import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import BoardData from "./data/board-data.json";
import {
    ChevronDownIcon,
    PlusIcon,
    DotsVerticalIcon,
    PlusCircleIcon,
} from "@heroicons/react/outline";
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

async function getData() {
  const q = query(collection(db, "tasks"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let tasksArr: (typeof BoardData) = [];

            querySnapshot.forEach((doc: any) => {
                tasksArr.push({ ...doc.data(), id: doc.id });
            });``
            
            // tech debt quick fix
            for (let i=0; i<tasksArr.length; i++) {
              //console.log(`the current status: ${tasksArr[i].status}`)
              // console.log(BoardData[0].items)
              if (tasksArr[i].status == "Backlog") {
                BoardData[0].items.push({
                  "id": tasksArr[i].id,
                  "priority": tasksArr[i].estimate,
                  "text": tasksArr[i].type,
                  "description" : tasksArr[i].info,
                })

              // Quick fix to duplicate items (hahahaha we are in so much technical debt i want to die)
              const ids = BoardData[0].items.map(({ id }) => id);
              BoardData[0].items = BoardData[0].items.filter(({ id }, index) => !ids.includes(id, index + 1))


              } else if (tasksArr[i].status == "To-Do") {
                BoardData[1].items.push({
                  "id": tasksArr[i].id,
                  "priority": tasksArr[i].estimate,
                  "text": tasksArr[i].type,
                  "description" : tasksArr[i].info,
                })
                const ids = BoardData[1].items.map(({ id }) => id);
              BoardData[1].items = BoardData[1].items.filter(({ id }, index) => !ids.includes(id, index + 1))
              } else if (tasksArr[i].status == "In Progress") {
                BoardData[2].items.push({
                  "id": tasksArr[i].id,
                  "priority": tasksArr[i].estimate,
                  "text": tasksArr[i].type,
                  "description" : tasksArr[i].info,
                })
                const ids = BoardData[2].items.map(({ id }) => id);
              BoardData[2].items = BoardData[2].items.filter(({ id }, index) => !ids.includes(id, index + 1))
              } else if (tasksArr[i].status == "Review") {
                BoardData[3].items.push({
                  "id": tasksArr[i].id,
                  "priority": tasksArr[i].estimate,
                  "text": tasksArr[i].type,
                  "description" : tasksArr[i].info,
                })
                const ids = BoardData[3].items.map(({ id }) => id);
              BoardData[3].items = BoardData[3].items.filter(({ id }, index) => !ids.includes(id, index + 1))
              } else if (tasksArr[i].status == "Done") {
                BoardData[4].items.push({
                  "id": tasksArr[i].id,
                  "priority": tasksArr[i].estimate,
                  
                  "text": tasksArr[i].type,
                  "description" : tasksArr[i].info,
                })
                const ids = BoardData[3].items.map(({ id }) => id);
              BoardData[3].items = BoardData[3].items.filter(({ id }, index) => !ids.includes(id, index + 1))
              }
            }
        });
        return BoardData

      }


export default async function Home() {
    const [ready, setReady] = useState(false);
    const [boardData, setBoardData] = useState(BoardData);
    const [showForm, setShowForm] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(0);

    useEffect(() => {
      
      if (process.browser) {
        setReady(true);
    } 
  }, []);

  await getData()

    const onDragEnd = (re) => {
        if (!re.destination) return;
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
    };

    return (
        <div>
            <div className="my-20 flex text-5xl font-extrabold justify-center items-center">
                Sunday.com
            </div>
            <li>
                <button
                    className="flex items-center w-20 h-20 border-gray-500 justify-center
                rounded-full"
                    style={{
                        position: "absolute",
                        top: "50px",
                        right: "100px",
                    }}
                >
                    <PlusIcon className="w-10 h-10 text-gray-500" />
                </button>
            </li>
            <div></div>
            {ready && (
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
                              ${snapshot.isDraggingOver && "bg-gray-800"}`}
                                                >
                                                    <span
                                                        className="w-full h-1 bg-gradient-to-r from-gray-800 to-gray-400
                            absolute inset-x-0 top-0"
                                                    ></span>
                                                    <h4 className=" p-3 flex justify-between items-center mb-2">
                                                        <span className="text-2xl text-gray-600">
                                                            {board.name}
                                                        </span>
                                                        <DotsVerticalIcon className="w-5 h-5 text-gray-500" />
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
