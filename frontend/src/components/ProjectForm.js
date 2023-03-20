import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            repository: '',
            users: []
        }
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.repository, this.state.users)
        event.preventDefault()
    }

    handleSelect(event) {
        let userList = this.state.users;
        [...event.target.selectedOptions].forEach(option => {
            if(this.state.users.includes(option.value)) {
                userList.splice(userList.indexOf(option.value), 1)
            } else {
                userList.push(option.value)
            }
        })
        this.setState({[event.target.name]: userList})
    }

    render() {
        return(
            <div>
                <form onSubmit={ (event) => this.handleSubmit(event)}>
                    <div className='form-group'>
                        <label htmlFor='name'>Название</label>
                        <input type='text' className='form-control' id='name' name='name' value={this.state.name}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='repository'>Ссылка на репозиторий</label>
                        <input type='url' className='form-control' id='repository' name='repository' value={this.state.repository}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='users'>Пользователи</label>
                        <select multiple={true} className='form-control' id='users' name='users' value={this.state.users}
                               onChange={(event) => this.handleSelect(event)}>
                            {this.props.users.map((user) => <option key={user.id} value={user.id}>{user.username}</option>)}
                        </select>
                    </div>
                    <input type='submit' className='btn btn-primary' value='Save' />
                </form>
            </div>
        );
    }
}

export default ProjectForm