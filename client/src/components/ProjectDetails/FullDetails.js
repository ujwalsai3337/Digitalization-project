import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './index'; // Import the Tanstack table component
import './FullDetails.css'; // Import CSS file for styling

function FullDetails() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/projects");
                setProjects(response.data);
            } catch (error) {
                setError("Error fetching projects");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Define columns for the Tanstack table
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {/* Render Tanstack table */}
            <Table columns={columns} projects={projects} />
        </div>
    );
}

export default FullDetails;
