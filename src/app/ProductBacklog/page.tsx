import "../../../styles/product-backlog";

export default function ProductBacklog() {
    const data = [
        {
            date: "22/04/2023",
            name: "John",
            as_a: "Dev",
            i_want_to:
                "be able to move tasks from product backlog to the scrum board",
            so_that: "we can see what needs to be worked on.",
            priority: "2",
            sprint: "1",
            status: "In progress",
        },
        {
            date: "23/04/2023",
            name: "Harry",
            as_a: "SM",
            i_want_to: "be able to add and remove columns on my scrum board",
            so_that: "we can update the scrum board.",
            priority: "1",
            sprint: "1",
            status: "Started",
        },
        {
            date: "26/04/2023",
            name: "Josh",
            as_a: "PO",
            i_want_to: "be able to assign one person to a task at a time",
            so_that: "everyone is working one task at a time",
            priority: "3",
            sprint: "2",
            status: "Done",
        },
    ];
    return (
        <div>
            <div className="my-20 flex text-5xl font-extrabold justify-center items-center">
                Sunday.com
            </div>
            <div className="App">
                <table>
                    <tbody>
                        <tr>
                            <th>Date</th>
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
                                <tr key={key}>
                                    <td>{val.date}</td>
                                    <td>{val.name}</td>
                                    <td>{val.as_a}</td>
                                    <td>{val.i_want_to}</td>
                                    <td>{val.so_that}</td>
                                    <td>{val.priority}</td>
                                    <td>{val.sprint}</td>
                                    <td>{val.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
