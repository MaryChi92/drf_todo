import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project, users, deleteProject}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                {project.users.map((userId) =>{
                    let user = users.find((user) => user.id === userId)
                    if(user){
                        return user.username
                    }
                    return userId
                })}
            </td>
            <td>
                {project.repository}
            </td>
            <td><button onClick={() => deleteProject(project.id)} type='button'>Удалить</button> </td>
        </tr>
    )
}

const ProjectList = ({projects, users, deleteProject}) => {
    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Users
                    </th>
                    <th>
                        Repository
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem key={project.id} project={project} users={users}
                                                        deleteProject={deleteProject} />)}
            </tbody>
        </table>
        <Link to='/projects/create' className='btn btn-primary'>Создать проект</Link>
        </div>
    )
}

export default ProjectList