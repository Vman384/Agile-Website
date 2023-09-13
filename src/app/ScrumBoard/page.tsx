"use client"
import { Card } from "react-bootstrap";
import IPageProps from "../../../interfaces/page";
import TaskCard from "../ScrumBoard/components/TaskCard";


const ScrumBoard: React.FunctionComponent<IPageProps> = props => {

    
   
    return (
        <div>
            
            <div className='my-20 flex text-5xl font-extrabold justify-center items-center'>Sunday.com</div>
            <div className='grid grid-cols-5'>
                <div className=" grid grid-cols-1 border-r-2 border-slate-300">
                    <h2 className="text-3xl w-max m-auto">Backlog</h2>
                    <TaskCard card ={{
                        text: "Task",
                        
                    }}></TaskCard>
                </div>
                <div className="grid grid-cols-1 border-r-2 border-slate-300">
                    <h2 className="text-3xl w-max m-auto">To-Do</h2>
                    <TaskCard card ={{
                        text: "Task",
                        
                    }}></TaskCard>
                </div>
                <div className="grid grid-cols-1 border-r-2 border-slate-300">
                    <h2 className="text-3xl w-max m-auto">In Progress</h2>
                    <TaskCard card ={{
                        text: "Task",
                        
                    }}></TaskCard>
                </div>
                <div className="grid grid-cols-1 border-r-2 border-slate-300">
                    <h2 className="text-3xl w-max m-auto">Review</h2>
                    <TaskCard card ={{
                        text: "Task",
                        
                    }}></TaskCard>
                </div>
                <div className="grid grid-cols-1r">
                    <h2 className="text-3xl w-max m-auto">Done</h2>
                    <TaskCard card ={{
                        text: "Task",
                        
                    }}></TaskCard>
                </div>
            </div>
        </div>
    )
}




export default ScrumBoard;

