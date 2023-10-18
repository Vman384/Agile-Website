import Link from 'next/link'
import CardButtonProps from '../../../../interfaces/menu';

const TaskCardButton: React.FunctionComponent<CardButtonProps> = ({ card }) => {
    return (
        <h3 style={{color: 'red', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>X
         </h3>
    )
   
}

export default TaskCardButton


