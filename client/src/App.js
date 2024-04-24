import { useState } from "react";
import "./App.css";
import Insert from "./components/Insert/index.js";
import Body from "./components/Body";
import Home from './components/Home';
import InputSec from './components/InputSec/index.js'
import { UserData } from "./data.js";
import Login from "./components/Login"
import SearchBar from './components/SearchBar/index.js';
import ProjectsTracking from './components/Tracking/ProjectsTracking';
import { DateTime } from 'luxon';
import { useMemo } from 'react' ;
import movies from './MOVIE_DATA.json';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Table from "./components/ProjectDetails/index.jsx";
import FullDetails from "./components/ProjectDetails/FullDetails.js";
import ProjectDetails from "./components/ProjectDetails/ProjectDetails.js";

const App = () => {
  //New Code

  const data = useMemo(() => movies, [])

  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      footer: 'ID',
    },
    {
      header: 'Name',
      columns: [
        {
          header: 'First',
          accessorKey: 'first_name',
          footer: 'First name',
        },
        {
          header: 'Last',
          accessorKey: 'last_name',
          footer: 'Last name',
        },
      ],
    },
    // {
    //   header: 'Name',
    //   accessorFn: row => `${row.first_name} ${row.last_name}`,
    // },
    // {
    //   header: 'First name',
    //   accessorKey: 'first_name',
    //   footer: 'First name',
    // },
    // {
    //   header: 'Last name',
    //   accessorKey: 'last_name',
    //   footer: 'Last name',
    // },
    {
      header: 'Email',
      accessorKey: 'email',
      footer: 'Email',
    },
    {
      header: 'Gender',
      accessorKey: 'gender',
      footer: 'Gender',
    },
    {
      header: 'Date of birth',
      accessorKey: 'dob',
      footer: 'Date of birth',
      cell: info =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
  ]

  const movieColumns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Genre',
      accessorKey: 'genre',
    },
    {
      header: 'Rating',
      accessorKey: 'rating',
    },
  ]

  //ENd
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authenticateUser = () => {
    setIsLoggedIn(true);
  };

  const userData = {
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Projects Sanctioned",
        data: UserData.map((data) => data.projectsSanctioned),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              authenticateUser={authenticateUser}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        {isLoggedIn ? (
          <>
            <Route
              path="/analytics"
              element={
                <div>
                  <Home />
                  <InputSec />
                </div>
              }
            />
            <Route path='/home' element={<div><Home/><br/> <FullDetails/></div>}/>
            <Route path='/track-progress' element={<SearchBar/>}/>
            <Route path='/tracking' element={<div><Home/><br/><Insert/></div>}/>
            <Route path='/project-details/:projectName' element={<div><Home/><ProjectDetails /></div>} />
          </>
        ) : (
          <Route
            path="/*"
            element={<Navigate to="/" replace={true} />}
          />
          
        )}
      </Routes>
    </Router> 
  );
}

export default App;
