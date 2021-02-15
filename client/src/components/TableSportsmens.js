import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'ФИО', width: 260 },
    { field: 'birthday', headerName: 'Год рождения', width: 150 },
    { field: 'nowTraner', headerName: 'Личный тренер', width: 260 },
    { field: 'school', headerName: 'Принадлежность', width: 180 },
    { field: 'telephone', headerName: 'Телефон', width: 140 },
  ];

export default function TableSportsmens(props) {
    const { sportsmens } = props;
    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid 
                rows={sportsmens} 
                columns={columns} 
                pageSize={15}
                className='table-style' 
                onRowClick={(e)=>{
                    window.location.assign('/sportsmen');
                    localStorage.setItem('sportsmen', JSON.stringify(e.row))
                }}/>
        </div>
    )
}