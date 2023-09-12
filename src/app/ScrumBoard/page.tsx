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
                <div className="flex justify-center border-r-2 border-slate-300">
                    <h2 className="text-3xl">To-Do</h2>
                </div>
                <div className="flex justify-center border-r-2 border-slate-300">
                    <h2 className="text-3xl">In Progress</h2>
                </div>
                <div className="flex justify-center border-r-2 border-slate-300">
                    <h2 className="text-3xl">Review</h2>
                </div>
                <div className="flex justify-center">
                    <h2 className="text-3xl">Done</h2>
                </div>
            </div>
        </div>
    )
}




export default ScrumBoard;

