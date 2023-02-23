import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project, users}) => {
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
                    console.log(user)
                    if(user){
                        return user.username
                    }
                    return userId
                })}
            </td>
            <td>
                {project.repository}
            </td>
        </tr>
    )
}

const ProjectList = ({projects, users}) => {
    return (
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
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem key={project.id} project={project} users={users}/>)}
            </tbody>
        </table>
    )
}

export default ProjectList