import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Body from '../Body';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import Table from "../ProjectDetails/index.jsx";


const InputSec = () => {
    const [filteredProjects,setfilteredProjects] = useState();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        year: "All",
        domain: "All",
        endYear: ""
    });
    const [projectCount,setProjectCount]=useState(0);
    const [amount,setAmount]=useState(0);
    const [guides,setGuides]=useState(0);
    const [students,setStudents]=useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/projects');
                const projects = response.data;

                // Fetch unique categories
                const allCategories = projects.reduce((acc, project) => {
                    if (!acc.includes(project.category)) {
                        acc.push(project.category);
                    }
                    return acc;
                }, []);
                setCategories(allCategories);

                // Apply filters
                const filteredProjects = applyFilters(projects);

                // Calculate values
                const totalAmount = calculateTotalAmount(filteredProjects);
                const uniqueGuidesCount = calculateUniqueGuidesCount(filteredProjects);
                const uniqueStudentsCount = calculateUniqueStudentsCount(filteredProjects);

                // Set state with calculated values
                setProjectCount(filteredProjects.length);
                setAmount(totalAmount);
                setGuides(uniqueGuidesCount);
                setStudents(uniqueStudentsCount);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [filters,filteredProjects]);

    // Helper function to apply filters to projects
    const applyFilters = (projects) => {
        const { year, domain, startYear, endYear } = filters;

        // Filter projects based on year
        let filteredProjects = projects;
        if (year && year !== 'All') {
            filteredProjects = filteredProjects.filter(project => project.year === parseInt(year));
            
        }

        // Filter projects based on domain
        if (domain && domain !== 'All') {
            filteredProjects = filteredProjects.filter(project => project.category === domain);
        }

        // Filter projects based on start and end year
        if (startYear) {
            filteredProjects = filteredProjects.filter(project => new Date(project.Start_date).getFullYear() >= parseInt(startYear));
        }
        if (endYear) {
            filteredProjects = filteredProjects.filter(project => new Date(project.Start_date).getFullYear() <= parseInt(endYear));
        }

           return filteredProjects;
    };

    // Helper function to calculate total amount from filtered projects
    const calculateTotalAmount = (projects) => {
        return projects.reduce((total, project) => total + project.amount, 0);
    };

    // Helper function to calculate unique guides count from filtered projects
    const calculateUniqueGuidesCount = (projects) => {
        const uniqueGuides = new Set();
        projects.forEach(project => {
            project.guides.forEach(guide => {
                uniqueGuides.add(guide);
            });
        });
        return uniqueGuides.size;
    };

    // Helper function to calculate unique students count from filtered projects
    const calculateUniqueStudentsCount = (projects) => {
        const uniqueStudents = new Set();
        projects.forEach(project => {
            project.Students.forEach(student => {
                uniqueStudents.add(student);
            });
        });
        return uniqueStudents.size;
    };

    // Handler function to update filters
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    // Generate options for years
    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        // Generate options for the last 20 years
        for (let year = currentYear; year >= currentYear - 20; year--) {
            years.push(<option key={year} value={year}>{year}</option>);
        }
        return years;
    };

    // Generate options for domains
    const generateDomainOptions = () => {
        const uniqueDomains = new Set();
        categories.forEach(category => {
            uniqueDomains.add(category.domain);
        });
        const domainOptions = ['All', ...Array.from(uniqueDomains)];
        return domainOptions.map(domain => (
            <option key={domain} value={domain}>{domain}</option>
        ));
    };

    const columns = [
        {
            header: 'Project Name',
            accessor: 'project_name',
            sortable: true,
        },
        {
            header: 'Amount',
            accessor: 'amount',
            sortable: true,
        },
        {
            header: 'Academic Year',
            accessor: 'year',
            sortable: true,
        },
    ];
    
    
    return (
        <>

            <div className='input'>

                <div className='input-field'>
                    <label className='label' htmlFor="year">Year:</label>
                    <select className="drop-input" name="year" id="year" onChange={handleFilterChange}>
                        <option value="All">All</option>
                        <option value="1">I</option>
                        <option value="2">II</option>
                        <option value="3">III</option>
                        <option value="4">IV</option>
                    </select>
                </div>

                <div className='input-field'>
                    <label className="label" htmlFor="domain">Domain:</label>
                    <select className='drop-input' name="domain" id="domain" onChange={handleFilterChange}>
                        <option value="All">All</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='input-field' id="date-input">
                    <label className="label" htmlFor="start-year">Start Year:</label>
                    <select
                        className="drop-input"
                        id="start-year"
                        name="startYear"
                        onChange={handleFilterChange}
                    >
                        <option value="">All</option>
                        {/* Generate options for years */}
                        {generateYearOptions()}
                    </select>
                </div>

                <div className='input-field' id="date-input">
                    <label className="label" htmlFor="end-year">End Year:</label>
                    <select
                        className="drop-input"
                        id="end-year"
                        name="endYear"
                        onChange={handleFilterChange}
                    >
                        <option value="">All</option>
                        {/* Generate options for years */}
                        {generateYearOptions()}
                    </select>
                </div> 
            </div>
            
            <div className='details'>
            <div className='details-container' >
                <div className='img' id='img1'></div>
                <button className='title' onClick={() => {return <Table columns={columns} projects={filteredProjects}/> }}>Total Projects </button>
                <h1 className='nums'>{projectCount}</h1>
            </div>

            <div className='details-container'>
            <div className='img' id='img2'></div>

                <h1 className='title'>Amount Invested  </h1>
                <h1 className='nums'>&#x20B9; {amount}</h1>
            </div>

            <div className='details-container'>
            <div className='img' id='img3'></div>

                <h1 className='title'>Faculties Involved </h1>
                <h1 className='nums'>{guides}</h1>
            </div>

            <div className='details-container'>
            <div className='img' id='img4'></div>

                <h1 className='title'>Students Involved </h1>
                <h1 className='nums'>{students} </h1>
            </div>
            </div>

            <div style={{ width: 700 }}>
                <Body filters={filters} />
            </div>
        </>
    );
}

export default InputSec;