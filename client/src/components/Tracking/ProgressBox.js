import React from 'react';
import Progress from './Progress';

function ProgressBox(props) {
  const project = props.project;
  console.log("I'm inside the box");
  console.log(project);
  return (
      <div className="content">
        <div className="participants">
          <div className='heading'>
            <h1>{project.project_name}</h1>
          </div>
            <h2>Students</h2>
            <div className="students">
                {project.Students.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </div>
            <h2>Guides</h2>
            <div className="guides">
                {project.guides.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </div>
        </div>
        <div className='graph'>
            <Progress project={project} />
        </div>
      </div>
  );
}

export default ProgressBox;
