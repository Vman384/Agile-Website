import { useState } from "react"

export default function BacklogTask( 
    {id, date, name, type, info, estimate, tag, status, taskChanged, provided} :
        {id: string, date: string, name: string, type: string, info: string, estimate: number, tag: string, status: string} 
    ) {
        const [dateVar, setDateVar] = useState(date)
        const [nameVar, setNameVar] = useState(name)
        const [typeVar, setTypeVar] = useState(type)
        const [infoVar, setInfoVar] = useState(info)
        const [estimateVar, setEstimateVar] = useState(estimate)
        const [tagVar, setTagVar] = useState(tag)
        const [statusVar, setStatusVar] = useState(status)

        return (
            <div className = "task">
                <div {...provided.dragHandleProps} {...provided.draggableProps} ref = {provided.innerRef}>
                    <div className = "flex mx-10 h-fit justify-center p-6 bg-white border border-gray-200 rounded-lg shadow">
                        <input className = "normal-width" type="text" placeholder="Date" onChange={(e) => {setDateVar(e.target.value); taskChanged(id, e.target.value, name, type, info, estimate, tag, status)}} value={dateVar}/>
                        <input className = "normal-width"  type="text" placeholder="Name" onChange={(e) => {setNameVar(e.target.value); taskChanged(id, date, e.target.value, type, info, estimate, tag, status)}} value={nameVar}/>
                        <select className = "normal-width"  name="Type" id="Type" onChange={(e) => {setTypeVar(e.target.value); taskChanged(id, date, name, type, info, estimate, e.target.value, status)}} value={typeVar}>
                            <option>User Story</option>
                            <option>Bug</option>
                        </select>                        
                        <input className = "long-width"  type="text" placeholder="Information" onChange={(e) => {setInfoVar(e.target.value); taskChanged(id, date, name, type, e.target.value, estimate, tag, status)}} value={infoVar}/>
                        <input className = "normal-width"  type="Number" placeholder="Estimate" onChange={(e) => {setEstimateVar(e.target.valueAsNumber); taskChanged(id, date, name, type, info, e.target.value, tag, status)}} value={estimateVar}/>
                        <select className = "normal-width"  name="Tag" id="Tag" onChange={(e) => {setTagVar(e.target.value); taskChanged(id, date, name, type, info, estimate, e.target.value, status)}} value={tagVar}>
                            <option>Front end</option>
                            <option>Back end</option>
                            <option>API</option>
                            <option>Database</option>
                            <option>Framework</option>
                            <option>Testing</option>
                            <option>UI</option>
                            <option>UX</option>
                        </select>
                        <select className = "normal-width"  name="Status" id="Status" onChange={(e) => {setStatusVar(e.target.value); taskChanged(id, date, name, type, info, estimate, tag, e.target.value)}} value={statusVar}>
                            <option value="Task Backlog">Task Backlog</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Awaiting Review">In Review</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </div>
            </div>
        )
}