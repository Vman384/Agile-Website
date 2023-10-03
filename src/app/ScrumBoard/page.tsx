"use client"
import { Card } from "react-bootstrap";
import IPageProps from "../../../interfaces/page";
import TaskCard from "../ScrumBoard/components/TaskCard";
import { useState, useEffect } from 'react'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import BoardData from "./data/board-data.json";
import {
    ChevronDownIcon,
    PlusIcon,
    DotsVerticalIcon,
    PlusCircleIcon,
  } from "@heroicons/react/outline";

  function createGuidId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  export default function Home() {
    const [ready, setReady] = useState(false);
    const [boardData, setBoardData] = useState(BoardData);
    const [showForm, setShowForm] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(0);
  
    useEffect(() => {
      if (process.browser) {
        setReady(true);
      }
    }, []);
  
    const onDragEnd = (re) => {
      if (!re.destination) return;
      let newBoardData = boardData;
      var dragItem =
        newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
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
  
    const onTextAreaKeyPress = (e) => {
      if(e.keyCode === 13) //Enter
      {
        const val = e.target.value;
        if(val.length === 0) {
          setShowForm(false);
        }
        else {
          const boardId = e.target.attributes['data-id'].value;
          const item = {
            id: createGuidId(),
            title: val,
            priority: 0,
            chat:0,
            attachment: 0,
            assignees: []
          }
          let newBoardData = boardData;
          newBoardData[boardId].items.push(item);
          setBoardData(newBoardData);
          setShowForm(false);
          e.target.value = '';
        }
      }
    }


    
   

   
    return (
        <div>
            
            <div className='my-20 flex text-5xl font-extrabold justify-center items-center'>Sunday.com</div>
            <li>
              <button
                className="flex items-center w-20 h-20 border-gray-500 justify-center
                rounded-full"
                style={{ position: 'absolute', top: '50px', right: '100px' }}
              >
                <PlusIcon className="w-10 h-10 text-gray-500" />
              </button>
            </li>
            <div>
        </div>
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
  
                              <div className="overflow-y-auto overflow-x-hidden h-auto"
                              style={{maxHeight:'calc(100vh - 290px)'}}>
                                {board.items.length > 0 &&
                                  board.items.map((item, iIndex) => {
                                    return (
                                      <TaskCard
                                        key={item.id}
                                        data={item}
                                        index={iIndex}
                                        className="m-3"
                                      />
                                    );
                                  })}
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
        


    



