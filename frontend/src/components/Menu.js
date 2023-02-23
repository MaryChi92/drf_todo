import React from "react";
import {Link} from 'react-router-dom'

const Menu = () => {
    return (
        <menu>
            <li>
                <Link to='/'>Главная</Link>
            </li>
            <li>
                <Link to='/users'>Все пользователи</Link>
            </li>
            <li>
                <Link to='/projects'>Проекты</Link>
            </li>
            <li>
                <Link to='/todos'>To-Dos</Link>
            </li>
        </menu>
    )
}

export default Menu