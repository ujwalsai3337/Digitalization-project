import React, { useState } from 'react';
import axios from 'axios';
import './Insert.css';

function Insert() {
  const [projectName, setProjectName] = useState('');
  const [students, setStudents] = useState(['']);
  const [guides, setGuides] = useState(['']);
  const [year, setYear] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [category, setCategory] = useState('');
  const [progress, setProgress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      project_name: projectName,
      students: students.filter(student => student !== ''),
      year: parseInt(year),
      guides: guides.filter(guide => guide !== ''),
      amount: parseInt(amount),
      duration: parseInt(duration),
      Start_date: startDate,
      category: category,
      progress: progress
    };
    
    try {
      const response = await axios.post('http://localhost:3000/api/projects', formData);
      console.log(response.data);
      clearForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
 
  const clearForm = () => {
    setProjectName('');
    setStudents(['']);
    setYear('');
    setGuides(['']);
    setAmount('');
    setDuration('');
    setStartDate('');
    setCategory('');
    setProgress('');
  };

  const addStudentField = () => {
    setStudents([...students, '']);
  };

  const addGuideField = () => {
    setGuides([...guides, '']);
  };

  return (
    <div className="insert-container">
      <form onSubmit={handleSubmit}>
        <label className="form-label">Project Name:</label>
        <input
          type="text"
          className="input-field"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
        
        <label className="form-label">Students:</label>
        {students.map((student, index) => (
          <div key={index}>
            <input
              type="text"
              className="input-field"
              value={student}
              onChange={(e) => {
                const updatedStudents = [...students];
                updatedStudents[index] = e.target.value;
                setStudents(updatedStudents);
              }}
              required
            />
          </div>
        ))}
        <button type="button" className="add-button" onClick={addStudentField}>Add Student</button>
        <br />
        <label className="form-label">Year:</label>
        <input
          type="number"
          className="input-field"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        
        <label className="form-label">Guides:</label>
        {guides.map((guide, index) => (
          <div key={index}>
            <input
              type="text"
              className="input-field"
              value={guide}
              onChange={(e) => {
                const updatedGuides = [...guides];
                updatedGuides[index] = e.target.value;
                setGuides(updatedGuides);
              }}
              required
            />
          </div>
        ))}
        <button type="button" className="add-button" onClick={addGuideField}>Add Guide</button>
        <br />
        <label className="form-label">Amount:</label>
        <input
          type="number"
          className="input-field"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        
        <label className="form-label">Duration (in months):</label>
        <input
          type="number"
          className="input-field"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        
        <label className="form-label">Start Date:</label>
        <input
          type="date"
          className="input-field"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        
        <label className="form-label">Category:</label>
        <input
          type="text"
          className="input-field"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default Insert;
