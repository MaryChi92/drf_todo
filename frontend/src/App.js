import React from "react";
import axios from "axios";
import logo from "./logo.svg";
import './App.css';
import UserList from './components/User'
import Menu from "./components/Menu";
import Footer from "./components/Footer";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                    this.setState(
                        {
                            'users': users
                        }
                    )
            }).catch(error => console.log(error))
    }

    render () {
        return (
            <div>
                <Menu />
                <UserList users={this.state.users} />
                <Footer />
            </div>
        )
    }
}

export default App;