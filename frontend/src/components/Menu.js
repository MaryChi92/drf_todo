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
    }

    handleSubmit() {
        this.searchProjects(this.state.search)
    }

    handleClear(event) {
        event.target.previousElementSibling.value = ''
        this.setState(
            {'search': ''}
        );
        this.searchProjects('')
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
                    {this.state.search ? <button onClick={(event) => this.handleClear(event)}>X</button> : null}
                    <button className="btn btn-primary" onClick={() => this.handleSubmit()} >
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