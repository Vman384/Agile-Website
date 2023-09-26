export default function BacklogTask( 
    {id, date, name, role, info, priority, sprint, status, provided} :
        {id: string, date: string, name: string, role: string, info: string, priority: string, sprint: string, status: string} 
    ) {
    return (
        <div className = "task">
            <div {...provided.dragHandleProps} {...provided.draggableProps} ref = {provided.innerRef}>
                <div className = "flex mx-10 h-fit justify-center p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <div className = "normal-width">{date}</div>
                    <div className = "normal-width">{name}</div>
                    <div className = "normal-width">{role}</div>
                    <div className = "long-width">{info}</div>
                    <div className = "normal-width">{priority}</div>
                    <div className = "normal-width">{sprint}</div>
                    <div className = "normal-width">{status}</div>
                </div>
            </div>
        </div>
    )
}