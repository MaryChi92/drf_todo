import React from "react";
import {Link} from "react-router-dom";

const TodoItem = ({todo, deleteTodo}) => {
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
            <td><button onClick={() => deleteTodo(todo.id)} type='button'>Удалить</button> </td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {
    return (
        <div>
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
                {todos.map((todo) => <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />)}
            </tbody>
        </table>
        <Link to='/todos/create' className='btn btn-primary'>Создать заметку</Link>
        </div>
    )
}

export default TodoList