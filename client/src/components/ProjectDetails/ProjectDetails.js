import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProgressBox from '../Tracking/ProgressBox';

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
    <div>
      <h2>{project.project_name}</h2>
      <p>Amount: {project.amount}</p>
      <p>Academic Year: {project.Start_date}</p>
      <ProgressBox project={project} />
    </div>
  );
}


export default ProjectDetails;
