import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProgressBox from '../Tracking/ProgressBox';
import './ProjectDetails.css';

function ProjectDetails() {
  const { projectName } = useParams();
  console.log(projectName);
  const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/projects");
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

  // Find the project with the matching project name
  const project = projects.find(project => project.project_name === projectName);

  if (!project) {
    return <div>Project not found!</div>;
  }

  return (
    <div className='conti'>
    <div>
      <h2>{project.project_name}</h2>
    </div>
    <div className='text'>
      <p>Amount: {project.amount}</p>
      <p>Academic Year: {project.Start_date.substring(0, 10)}</p>
    </div>
    <div className='stu'>
        <h2>Students</h2>
        <div className="students">
            {project.Students.map((value, index) => (
                <li key={index}>{value}</li>
            ))}
        </div>
    </div>
        
    <div className='Gui'>
        <h2>Guides</h2>
        <div className="guides">
            {project.guides.map((value, index) => (
                <li key={index}>{value}</li>
            ))}
      </div>
    </div>
    <div>
      <ProgressBox project={project} />
    </div>
    </div>

  
  );
}


export default ProjectDetails;
