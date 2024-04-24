import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import './index.css';

function Body({ filters }) {
  const [projects, setProjects] = useState([]);
  const [projectCounts, setProjectCounts] = useState({});
  const [studentCounts, setStudentCounts] = useState({});
  const [amounts, setAmounts] = useState({});
  const [projectsPerYear, setProjectsPerYear] = useState({});
  const [studentsPerYear, setStudentsPerYear] = useState({});
  const [amountsPerYear, setAmountsPerYear] = useState({});
  const [showCharts, setShowCharts] = useState(true); // To toggle visibility of pie charts

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/projects");
        console.log(response.data); // Log the response data
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Update showCharts state based on filters
    if (filters && filters.domain !== "All") {
      setShowCharts(false);
    } else {
      setShowCharts(true);
    }
  }, [filters]);

  // Filter projects based on the provided filters
  const filteredProjects = projects.filter((project) => {
    if (filters == undefined) return true;
    const year = parseInt(filters.year.slice(-2)); // Extract last two digits of the year
    if (project.year !== year && filters.year !== "All") return false;

    if (
      filters.domain &&
      filters.domain !== "All" &&
      filters.domain !== project.category
    ) {
      return false;
    }

    if (filters.years !== "All") {
      const currentYear = new Date().getFullYear();
      const projectStartYear = new Date(project.Start_date).getFullYear();
      const yearsDifference = currentYear - projectStartYear;
      if (yearsDifference > parseInt(filters.years)) {
        return false;
      }
    }

    return true;
  });

  useEffect(() => {
    countProjectsAndStudentsPerDomain();
    countProjectsPerYear();
    countStudentsPerYear();
    countAmountsPerYear();
  }, [projects]);

  const countProjectsAndStudentsPerDomain = () => {
    const projectCounts = {};
    const studentCounts = {};
    const amounts = {};

    projects.forEach((project) => {
      // Count projects per domain
      projectCounts[project.category] =
        (projectCounts[project.category] || 0) + 1;

      // Count students per domain if project has students
      if (project.Students && Array.isArray(project.Students)) {
        project.Students.forEach((student) => {
          studentCounts[project.category] =
            (studentCounts[project.category] || 0) + 1;
        });
      }

      // Sum amounts per domain
      amounts[project.category] =
        (amounts[project.category] || 0) + project.amount;
    });

    setProjectCounts(projectCounts);
    setStudentCounts(studentCounts);
    setAmounts(amounts);
  };

  const countProjectsPerYear = () => {
    const projectsPerYear = {};

    projects.forEach((project) => {
      const academicYear = getAcademicYear(project.Start_date);
      projectsPerYear[academicYear] = (projectsPerYear[academicYear] || 0) + 1;
    });

    setProjectsPerYear(projectsPerYear);
  };

  const countStudentsPerYear = () => {
    const studentsPerYear = {};

    projects.forEach((project) => {
      const academicYear = getAcademicYear(project.Start_date);
      if (project.Students && Array.isArray(project.Students)) {
        studentsPerYear[academicYear] =
          (studentsPerYear[academicYear] || 0) + project.Students.length;
      }
    });

    setStudentsPerYear(studentsPerYear);
  };

  const countAmountsPerYear = () => {
    const amountsPerYear = {};

    projects.forEach((project) => {
      const academicYear = getAcademicYear(project.Start_date);
      amountsPerYear[academicYear] =
        (amountsPerYear[academicYear] || 0) + project.amount;
    });

    setAmountsPerYear(amountsPerYear);
  };

  const getAcademicYear = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const nextYear = year + 1;
    return `${year}-${String
      (nextYear).slice(2)}`;
    };
  
    const projectPieChartData = {
      labels: Object.keys(projectCounts),
      datasets: [
        {
          label: "Projects",
          data: Object.values(projectCounts),
          backgroundColor: [
            "#59D5E0",
            "#87A922",
            "#FCDC2A",
            "#F7418F",
            "#FF204E",
            "#6420AA",
          ],
        },
      ],
    };
  
    const studentPieChartData = {
      labels: Object.keys(studentCounts),
      datasets: [
        {
          label: "Students",
          data: Object.values(studentCounts),
          backgroundColor: [
            "#59D5E0",
            "#87A922",
            "#FCDC2A",
            "#F7418F",
            "#FF204E",
            "#6420AA",
          ],
        },
      ],
    };
  
    const amountPieChartData = {
      labels: Object.keys(amounts),
      datasets: [
        {
          label: "Amount",
          data: Object.values(amounts),
          backgroundColor: [
            "#59D5E0",
            "#87A922",
            "#FCDC2A",
            "#F7418F",
            "#FF204E",
            "#6420AA",
          ],
        },
      ],
    };
  
    const projectsPerYearChartData = {
      labels: Object.keys(projectsPerYear),
      datasets: [
        {
          label: "No. of Projects",
          data: Object.values(projectsPerYear),
          backgroundColor: "#59D5E0",
        },
      ],
    };
  
    const studentsPerYearChartData = {
      labels: Object.keys(studentsPerYear),
      datasets: [
        {
          label: "No. of Students",
          data: Object.values(studentsPerYear),
          backgroundColor: "#87A922",
        },
      ],
    };
  
    const amountsPerYearChartData = {
      labels: Object.keys(amountsPerYear),
      datasets: [
        {
          label: "Amount",
          data: Object.values(amountsPerYear),
          backgroundColor: "#FCDC2A",
        },
      ],
    };
  
    return (
      <div className="big" style={{ marginTop:'100px'}}>
      <div className="main">
        {showCharts && (<div className={`chart-container ${showCharts ? 'show' : 'hide'}`}  style={{ display: "flex", justifyContent: "space-around" }}>
          <section>
            {showCharts && (
              <div className="chart" style={{ width: "450px", height: "450px" }}>
                <h2>Projects</h2>
                <Pie data={projectPieChartData} />
              </div>
            )}
          </section>
          <section>
            {showCharts && (
              <div className="chart" style={{ width: "450px", height: "450px" }}>
                <h2>Students</h2>
                <Pie data={studentPieChartData} />
              </div>
            )}
          </section>
          <section>
            {showCharts && (
              <div className="chart" style={{ width: "450px", height: "450px" }}>
                <h2>Amounts</h2>
                <Pie data={amountPieChartData} />
              </div>

            )}
            
          </section>
          </div>)}
          <div className={`chart-container1 ${!showCharts ? 'show' : ''}`} style ={{display: "flex", justifyContent: "space-between",  marginTop:'150px'}}>
          <section>
          
            <div className="chart" style={{ width: "450px", height: "450px" }}>
              <h2>No. of Projects per Year</h2>
              <Bar
                data={projectsPerYearChartData}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                          precision: 0,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </section>
          <section>
            <div className="chart" style={{ width: "450px", height: "450px" }}>
              <h2>No. of Students per Year</h2>
              <Bar
                data={studentsPerYearChartData}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                          precision: 0,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </section>
          <section>
            <div className="chart" style={{ width: "450px", height: "450px" }}>
              <h2>Amounts per Year</h2>
              <Bar
                data={amountsPerYearChartData}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                          precision: 0,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
            
          </section>
        </div>
    
      </div>
       </div>
       
    );
  }
  
  export default Body;
