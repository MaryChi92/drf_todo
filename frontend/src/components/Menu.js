import React from "react";
import {Link} from 'react-router-dom'

class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.is_auth = this.props.is_auth
        this.logout = this.props.logout
        this.searchProjects = this.props.searchProjects
        this.state = {
            'search': ''
        }
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
        console.log(this.state.search)
    }

    handleSubmit() {
        console.log(this.state.search)
        this.searchProjects(this.state.search)
    }

    render() {
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
                <li>
                    <input id="search" name='search' type="text" className="input" placeholder="искать..."
                           onChange={(event) => this.handleChange(event)}/>
                    <button id="clear" className="clear-results" onClick={() => this.handleSubmit()} >
                        <Link to='/projects'>Найти</Link>
                    </button>
                </li>
                <li>
                    {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> :
                        <Link to='/login'>Login</Link>}
                </li>
            </menu>
        )
    }
}

export default Menu