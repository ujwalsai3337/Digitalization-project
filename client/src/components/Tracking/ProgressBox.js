import React from 'react';
import Progress from './Progress';
import './ProgressBox.css'

function ProgressBox(props) {
  const project = props.project;
  console.log("I'm inside the box");
  console.log(project);
  return (
      <div className="content">
        <div className="participants">
          <div className='heading'> 
          </div>
          <div className='stu-gui'>
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
            </div>
        </div>
        <div className='graph'>
            <Progress project={project} />
        </div>
      </div>
  );
}

export default ProgressBox;
