import { useState } from "react"

export default function BacklogTask( 
    {id, date, name, role, info, priority, sprint, status, taskChanged, provided} :
        {id: string, date: string, name: string, role: string, info: string, priority: string, sprint: string, status: string} 
    ) {
        const [dateVar, setDateVar] = useState(date)
        const [nameVar, setNameVar] = useState(name)
        const [roleVar, setRoleVar] = useState(role)
        const [infoVar, setInfoVar] = useState(info)
        const [priorityVar, setPriorityVar] = useState(priority)
        const [sprintVar, setSprintVar] = useState(sprint)
        const [statusVar, setStatusVar] = useState(status)

        return (
            <div className = "task">
                <div {...provided.dragHandleProps} {...provided.draggableProps} ref = {provided.innerRef}>
                    <div className = "flex mx-10 h-fit justify-center p-6 bg-white border border-gray-200 rounded-lg shadow">
                        <input className = "normal-width" type="text" placeholder="Date" onChange={(e) => {setDateVar(e.target.value); taskChanged(id, e.target.value, name, role, info, priority, sprint, status)}} value={dateVar}/>
                        <input className = "normal-width"  type="text" placeholder="Name" onChange={(e) => {setNameVar(e.target.value); taskChanged(id, date, e.target.value, role, info, priority, sprint, status)}} value={nameVar}/>
                        <input className = "normal-width"  type="text" placeholder="Role" onChange={(e) => {setRoleVar(e.target.value); taskChanged(id, date, name, e.target.value, info, priority, sprint, status)}} value={roleVar}/>
                        <input className = "long-width"  type="text" placeholder="Information" onChange={(e) => {setInfoVar(e.target.value); taskChanged(id, date, name, role, e.target.value, priority, sprint, status)}} value={infoVar}/>
                        <input className = "normal-width"  type="text" placeholder="Priority" onChange={(e) => {setPriorityVar(e.target.value); taskChanged(id, date, name, role, info, e.target.value, sprint, status)}} value={priorityVar}/>
                        <select className = "normal-width"  name="Sprint" id="Sprint" onChange={(e) => {setSprintVar(e.target.value); taskChanged(id, date, name, role, info, priority, e.target.value, status)}} value={sprintVar}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <select className = "normal-width"  name="Status" id="Status" onChange={(e) => {setStatusVar(e.target.value); taskChanged(id, date, name, role, info, priority, sprint, e.target.value)}} value={statusVar}>
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