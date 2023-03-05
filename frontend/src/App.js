import React from "react";
import axios from "axios";
import logo from "./logo.svg";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import Cookies from "universal-cookie"

import './App.css';
import UserList from './components/User'
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import LoginForm from "./components/Auth";
import ProjectList from "./components/Project";
import TodoList from "./components/Todo";
import ProjectInfo from "./components/ProjectInfo";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': ''
        }
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data.results
                    this.setState(
                        {
                            'users': users
                        }
                    )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data.results
                    this.setState(
                        {
                            'projects': projects
                        }
                    )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos/', {headers})
            .then(response => {
                const todos = response.data.results
                    this.setState(
                        {
                            'todos': todos
                        }
                    )
            }).catch(error => console.log(error))
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {'username': username, 'password': password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => {
                console.log(error.response.data)
                alert('Проверьте правильность логина и/или пароля')
        })
    }

    is_auth(){
        return !!this.state.token
    }

    get_headers(){
        let headers = {
            'Content-Type':'applications/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = `Token ${this.state.token}`
        }
        return headers
    }

    logout() {
        this.set_token('')
    }

    get_token_from_cookies() {
        const cookies = new Cookies()
        const token = cookies.get('token')

        this.setState({'token': token}, () => this.load_data())
    }

    componentDidMount() {
        this.get_token_from_cookies()
    }

    render () {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Menu />
                            <li>
                                {this.is_auth()? <button onClick={() => this.logout()}>Logout</button>:
                                <Link to='/login'>Login</Link>}
                            </li>
                    </div>
                    <Routes>
                        <Route path='/' element={'Это главная страница'} />
                        <Route path='users' element={<UserList users={this.state.users}/>} />
                        <Route path='projects' element={<ProjectList projects={this.state.projects} users={this.state.users} />} />
                            <Route path='projects/:id' element={<ProjectInfo todos={this.state.todos} projects={this.state.projects} />} />
                        <Route path='todos' element={<TodoList todos={this.state.todos} />} />
                        <Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </div>
        )
    }
}

export default App;