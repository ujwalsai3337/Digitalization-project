import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const ProjectsTimeline = () => {
  const [years, setYears] = useState(1);
  const [projectData, setProjectData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/projects');
        const projects = response.data;

        console.log(projects);
    }catch(err){
        console.log(err);
    }
}});


  return (
    <></>
  );
};

export default ProjectsTimeline;
