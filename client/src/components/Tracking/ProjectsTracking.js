import React, { useState, useEffect } from 'react';
import ProgressBox from './ProgressBox';
import { Popup } from 'reactjs-popup';
import './ProjectsTracking.css';
import axios from 'axios';

function ProjectsTracking() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [UserData, setUserData] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/projects");
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);
  // State to manage form data for project update
  const [updatedProjectData, setUpdatedProjectData] = useState({
    project_name: '',
    Students: [],
    year: '',
    guides: [],
    amount: '',
    duration: '',
    Start_date: '',
    category: '',
  });

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProjectData({
      ...updatedProjectData,
      [name]: value,
    });
  };

  // Function to handle project update submission
  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    // Implement logic to update project data
    console.log('Updated Project Data:', updatedProjectData);
    // Close the update popup after submission
    setSelectedProject(null);
  };

  // Function to set initial values in the update form
  const setInitialValues = (project) => {
    setUpdatedProjectData({
      project_name: project.project_name,
      Students: project.Students,
      year: project.year,
      guides: project.guides,
      amount: project.amount,
      duration: project.duration,
      Start_date: project.Start_date,
      category: project.category,
    });
  };

  return (
    <div>
      <table className="projects-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {UserData.map((project, index) => (
            <tr key={index}>
              <td>{project.project_name}</td>
              <td>
              <Popup
                  trigger={<button>View Progress</button>}
                  modal
                  nested
                  position="center center"
                  closeOnDocumentClick={false}
                  contentStyle={{
                    backgroundColor: 'white',
                    padding: '20px',
                    border: '5px solid black',
                    borderRadius: '8px'
                  }}
                >
                  {(close) => (
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                      <button className="close" onClick={close}>&times;</button>
                      <ProgressBox project={project} />
                    </div>
                  )}
                </Popup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectsTracking;
