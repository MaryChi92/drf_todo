import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: '',
            text: '',
            created_by_user: '',
            is_active: true
        }
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleSubmit(event) {
        this.props.createToDo(this.state.project, this.state.text, this.state.created_by_user, this.state.is_active)
        event.preventDefault()
    }

    render() {
        return(
            <div>
                <form onSubmit={ (event) => this.handleSubmit(event)}>
                    <div className='form-group'>
                        <label htmlFor='project'>Проект</label>
                        <select className='form-control' id='project' name='project' value={this.state.project}
                                onChange={(event) => this.handleChange(event)}>
                            {this.props.projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='text'>Текст</label>
                        <input type='text' className='form-control' id='text' name='text' value={this.state.text}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='created_by_user'>Создана</label>
                        <select className='form-control' id='created_by_user' name='created_by_user' value={this.state.created_by_user}
                               onChange={(event) => this.handleChange(event)}>
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