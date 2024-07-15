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
        </div>
        <div className='graph'>
            <Progress project={project} />
        </div>
      </div>
  );
}

export default ProgressBox;
