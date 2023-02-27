import React from "react";
import axios from "axios";
import logo from "./logo.svg";
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import './App.css';
import UserList from './components/User'
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ProjectList from "./components/Project";
import TodoList from "./components/Todo";
import ProjectInfo from "./components/ProjectInfo";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }
    //
    //
    // let function_1 = (url) => {
    //     axios.get(`http://127.0.0.1:8000/api/${url}`)
    //         .then(response => {
    //             const data = response.data
    //                 this.setState(
    //                     {
    //                         `${url}`: data
    //                     }
    //                 )
    //         }). catch(error => console.log(error))
    // }


    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results
                    this.setState(
                        {
                            'users': users
                        }
                    )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data.results
                    this.setState(
                        {
                            'projects': projects
                        }
                    )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos')
            .then(response => {
                const todos = response.data.results
                    this.setState(
                        {
                            'todos': todos
                        }
                    )
            }).catch(error => console.log(error))
    }

    render () {
        return (
            <div className="App">
                <BrowserRouter>
                    <Menu />
                    <Routes>
                        <Route path='/' element={'Это главная страница'} />
                        <Route path='users' element={<UserList users={this.state.users}/>} />
                        <Route path='projects' element={<ProjectList projects={this.state.projects} users={this.state.users} />} />
                            <Route path='projects/:id' element={<ProjectInfo todos={this.state.todos} projects={this.state.projects} />} />
                        <Route path='todos' element={<TodoList todos={this.state.todos} />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </div>
        )
    }
}

export default App;