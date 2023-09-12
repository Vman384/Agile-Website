"use client"
import IPageProps from '../../../interfaces/page';
import './App.css';

const ProductBacklog: React.FunctionComponent<IPageProps> = props => {
    const data = [
      {name:"John",as_a:"Dev",i_want_to:"",so_that:"",priority:"",sprint:"",status:""},
      {name:"Harry",as_a:"SM",i_want_to:"",so_that:"",priority:"",sprint:"",status:""},
      {name:"Josh",as_a:"proxy PO",i_want_to:"",so_that:"",priority:"",sprint:"",status:""},
      {name:"Alex",as_a:"User",i_want_to:"",so_that:"",priority:"",sprint:"",status:""},
    ]
    return (
        <div>
            <div className='my-20 flex text-5xl font-extrabold justify-center items-center'>Sunday.com</div>
            <div className="App">
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>As a ...</th>
                    <th>I want to</th>
                    <th>So that</th>
                    <th>Priority</th>
                    <th>Sprint</th>
                    <th>Status</th>
                </tr>
                {data.map((val, key) => {
                return (
                    <tr key = {key}>
                    <td>{val.name}</td>
                    <td>{val.as_a}</td>
                    <td>{val.so_that}</td>
                    <td>{val.priority}</td>
                    <td>{val.sprint}</td>
                    <td>{val.status}</td>
                    </tr>
                )
                })}
            </tbody>
        </table>
        </div>
        </div>
    )
}

export default ProductBacklog;