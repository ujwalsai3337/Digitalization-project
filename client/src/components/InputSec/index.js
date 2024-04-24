import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Body from '../Body';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const InputSec = () => {
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        year: "All",
        domain: "All",
        years: "All"
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/projects');
                const projects = response.data;
                const allCategories = projects.reduce((acc, project) => {
                    if (!acc.includes(project.category)) {
                        acc.push(project.category);
                    }
                    return acc;
                }, []);
                setCategories(allCategories);
                console.log(categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
        console.log(filters);       
        console.log("Checking filter");
    };

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        // Generate options for the last 100 years
        for (let year = currentYear; year >= currentYear - 20; year--) {
            years.push(<option key={year} value={year}>{year}</option>);
        }
        return years;
    };

    return (
        <>
            <div className='input'>
                <div className='input-field'>
                    <label className='label' htmlFor="year">Year:</label>
                    <select className="drop-input" name="year" id="year" onChange={handleFilterChange}>
                        <option value="All">All</option>
                        <option value="year1">I</option>
                        <option value="year2">II</option>
                        <option value="year3">III</option>
                        <option value="year4">IV</option>
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
            <div style={{ width: 700 }}>
                <Body filters={filters} />
            </div>
        </>
    );
}

export default InputSec;
