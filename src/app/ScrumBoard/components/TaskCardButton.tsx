import Link from 'next/link'
import CardButtonProps from '../../../../interfaces/menu';
import { FaTimes } from 'react-icons/fa'

const TaskCardButton: React.FunctionComponent<CardButtonProps> = ({ card }) => {
    return (
        <h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <FaTimes style={{color: 'red', cursor: 'pointer'}}/>
         </h3>
    )
   
}

export default TaskCardButton


