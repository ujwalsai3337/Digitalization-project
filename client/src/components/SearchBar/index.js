import React, { useState, useEffect } from 'react';
import './index.css';
import Home from '../Home/index';
import axios from 'axios';

// New SearchBox component for suggestions
const SearchBox = ({ handleSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [projectNames, setProjectNames] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/projects");
                setProjectNames(response.data.map(project => ({ id: project._id, name: project.project_name, guide: project.guides, amount: project.amount, Start_date: project.Start_date })));
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

    const handleSearchInputChange = (event) => {
        const inputValue = event.target.value;
        setSearchQuery(inputValue);
        const filteredSuggestions = projectNames.filter(project =>
            project.name.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        const maxSuggestionsToShow = 5;
        const limitedSuggestions = filteredSuggestions.slice(0, maxSuggestionsToShow);
        setSuggestions(limitedSuggestions);
    };

    const handleSuggestionClick = (project) => {
        setSearchQuery(project.name);
        setSuggestions([]);
        handleSearch(project); // Trigger search with selected suggestion
    };

    return (
        <div className='search-box'>
            <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((project, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(project)}>
                            {project.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// Modified SearchBar component with integrated SearchBox
const SearchBar = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [directionMarks, setDirectionMarks] = useState(0);
    const [resourceMarks, setResourceMarks] = useState(0);
    const [satisfactionMarks, setSatisfactionMarks] = useState(0);
    const [comments, setComments] = useState('');
    const [guideEdit, setGuideEdit] = useState(false); // State to toggle guide editing
    const [guide, setGuide] = useState('');
    const [amtEdit, setAmtEdit] = useState(false); // State to toggle amount editing
    const [amt, setAmt] = useState(0);
    const [searchResult, setSearchResult] = useState(null);
    const [file, setFile] = useState()

    function handleFile(event) {
        setFile(event.target.files[0])
        console.log(event.target.files[0])

    }

    const handleSearch = (project) => {
        setSelectedProject(project);
        setSearchResult(null);
        setGuide(project.guide); // Set guide and amount when a project is selected
        setAmt(project.amount);
    };

    // Define updateGuide and updateAmount functions
    const updateGuide = async () => {
        if (!selectedProject) {
            console.error("No project selected.");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/api/projects/${selectedProject.id}`, { guide });
            console.log("Guide updated:", response.data);
            // Update local state after successful update
            setGuide(guide);
            setGuideEdit(false); // Exit edit mode
        } catch (error) {
            console.error("Error updating guide:", error);
        }
    };

    const updateAmount = async () => {
        if (!selectedProject) {
            console.error("No project selected.");
            return;
        }
    
        try {
            const response = await axios.put(`http://localhost:3000/api/projects/${selectedProject.id}`, { amount: amt });
            console.log("Amount updated:", response.data);
            // Update local state after successful update
            setAmt(response.data.amount); // Update local state with the response data
            setAmtEdit(false); // Exit edit mode
        } catch (error) {
            console.error("Error updating amount:", error);
        }
    };

    const handleInsertProgress = async () => {
        if (!selectedProject) {
            console.error("No project selected.");
            return;
        }

        const progressData = {
            projectId: selectedProject.id,
            direction: directionMarks,
            resource_utilization: resourceMarks,
            satisfaction: satisfactionMarks,
            comments: comments
        };

        // Update guide and amount fields if they have been edited
        if (guideEdit) {
            progressData.guide = guide;
        }
        if (amtEdit) {
            progressData.amount = amt;
        }

        try {
            console.log("insert start")
            let response;
            if (guideEdit || amtEdit) { // Check if guide or amount has been edited
                response = await axios.put(`http://localhost:3000/api/projects/:projectName`, { guide, amount: amt }); // Update guide and amount using PUT request
            }
            response = await axios.post("http://localhost:3000/api/progress", progressData); // Insert progress using POST request
            console.log("insert end")
            console.log(response.data);
            // Reset form after successful insert
            setSelectedProject(null);
            setDirectionMarks(0);
            setResourceMarks(0);
            setSatisfactionMarks(0);
            setComments('');
            setSearchResult(response.data);
        } catch (error) {
            console.error("Error inserting progress:", error);
        }
    };


    return (
        <div className='progresspage'>
            <Home />
            <div className='secondbar'>
                <SearchBox handleSearch={handleSearch} />
            </div>
            {selectedProject && (
                <div className='table'>
                    <table>
                        <tr className='head-row1' id='sm'>
                            <td>
                                <h3>Project Name: {selectedProject.name}</h3>
                                        <div class="butt1">
                    <h3>Project Guide: 
                        {guideEdit ? 
                            <React.Fragment>
                                <input type='text' value={guide} onChange={(e) => setGuide(e.target.value)} onBlur={() => setGuideEdit(false)} />
                                {guideEdit && <input id="butt2" type='submit' onClick={updateGuide}></input>}
                            </React.Fragment>
                            : <span onClick={() => setGuideEdit(true)}>{guide}</span>
                        }
                    </h3>
            </div>
                <div class="butt1">
                    <h3>Sanctioned Amount: 
                        {amtEdit ? 
                            <React.Fragment>
                                <input type='number' value={amt} onChange={(e) => setAmt(e.target.value)} onBlur={() => setAmtEdit(false)} />
                                {amtEdit && <input id="butt2" type='submit' onClick={updateAmount}></input>}
                            </React.Fragment>
                            : <span onClick={() => setAmtEdit(true)}>{amt}</span>
                        }
                </h3>
</div>

                                <h3>Start_date: {new Date(selectedProject.Start_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</h3>
                                
                            </td>
                        </tr>

                        <tr className='head-row1'>
                            <h2><u>Direction</u></h2>
                            <div className='head-row2'>

                                <td>


                                    <input
                                        type="range"
                                        value={directionMarks}
                                        min="0"
                                        max="10"
                                        onChange={(e) => setDirectionMarks(parseInt(e.target.value))}
                                    /></td>

                            </div>
                        </tr>
                        <tr className='head-row1'>
                            <td>
                                <h2><u>Resource utilization</u></h2>
                            </td>
                            <div className='head-row2'>
                                <input
                                    type="range"
                                    value={resourceMarks}
                                    min="0"
                                    max="10"
                                    onChange={(e) => setResourceMarks(parseInt(e.target.value))}
                                />
                            </div>


                        </tr>
                        <tr className='head-row1'>
                            <td>
                                <h2><u>Satisfaction</u></h2>
                            </td>
                            <div className='head-row2'>
                                <input
                                    type="range"
                                    value={satisfactionMarks}
                                    min="0"
                                    max="10"
                                    onChange={(e) => setSatisfactionMarks(parseInt(e.target.value))}
                                />
                            </div>


                        </tr>

                    </table>
                    <div className='comment'>
                        <h2>Comments</h2>
                        <input type="text" id="comments" placeholder='Enter your comments' value={comments} onChange={(e) => setComments(e.target.value)} />
                    </div>


                    <div className='submit-file'>
                        <h2>Upload Files</h2>
                        <input id="file-upload" type='file' name='file' placeholder='Upload your file' onChange={handleFile} />
                        <button id='submit-button' onClick={handleInsertProgress}>Insert Progress</button>
                    </div>
                </div>

            )}
            {searchResult && (
                <div className='result'>
                    <h3>Progress inserted successfully for project: {searchResult.project_name}</h3>
                </div>
            )}

        </div>
    );
}

export default SearchBar;
