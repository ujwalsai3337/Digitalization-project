import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

export default function Table({ columns, projects }) {
  const [filtering, setFiltering] = useState('');
  const [sorting, setSorting] = useState([]);
  console.log(projects)
  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  
  // Ensure filteredSortedRows is properly initialized
  const filteredSortedRows = table.filteredSortedRows || [];
  
  const filteredProjects = filtering
    ? projects.filter(project => {
        // Filter based on the search term
        return Object.values(project).some(value =>
          String(value).toLowerCase().includes(filtering.toLowerCase())
        );
      })
    : projects;

  if (!projects) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w3-container'>
      <input className='sbb'
      placeholder='Search...'
        type='text'
        value={filtering}
        onChange={e => setFiltering(e.target.value)}
      />
      
      <table className='w3-table-all'>

        

      
<tbody>
<thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: '🔼', desc: '🔽' }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
  {filteredProjects.map(project => (
    <tr key={project._id}>
      {columns.map(column => (
        <td key={column.accessor}>
          {/* Check if the column is the project name column */}
          {column.accessor === 'project_name' ? (
            // If it's the project name, wrap it in an anchor tag
          <Link
            to={`/project-details/${encodeURIComponent(project.project_name)}`}
            style={{
              textDecoration: 'none',
              color: '#040609',
              transition: 'color 0.1s',
            }}
            onMouseOver={(e) => { e.target.style.color = '#0061ff'; }}
            onMouseOut={(e) => { e.target.style.color = '#040609'; }}
          >
            {project[column.accessor]}
          </Link>

          

          ) : (
            // If it's not the project name, display the column value
            project[column.accessor]
          )}
        </td>
      ))}
    </tr>
  ))}
</tbody>



      </table>
      <div className='footer'>
        <button onClick={() => table.setPageIndex(0)}>First page</button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next page
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last page
        </button>
      </div>
    </div>
  );
}
