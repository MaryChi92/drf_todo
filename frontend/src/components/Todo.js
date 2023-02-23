import React from "react";

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.created_by_user}
            </td>
            <td>
                {todo.is_active}
            </td>
            <td>
                {todo.created_at}
            </td>
            <td>
                {todo.updated_at}
            </td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Project
                    </th>
                    <th>
                        Text
                    </th>
                    <th>
                        Created by (user)
                    </th>
                    <th>
                        Active
                    </th>
                    <th>
                        Created at
                    </th>
                    <th>
                        Updated at
                    </th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
            </tbody>
        </table>
    )
}

export default TodoList