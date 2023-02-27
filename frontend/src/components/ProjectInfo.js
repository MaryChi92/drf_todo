import React from "react";
import {useParams} from "react-router-dom";

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.is_active}
            </td>
        </tr>
    )
}

const TodoListProject = ({todos, projects}) => {

    let {id} = useParams()
    // console.log(id)

    let filteredTodos = todos.filter((todo) => todo.project === parseInt(id))


    return (
        <table>
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Text
                    </th>
                    <th>
                        Active
                    </th>
                </tr>
            </thead>
            <tbody>
                {filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} projects={projects}/>)}
            </tbody>
        </table>
    )
}

export default TodoListProject