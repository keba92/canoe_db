import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      height: 40
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

export default function AdminSportsmens() {
    const socket = io();
    const [sportsmens, setSportsmens] = useState(null);
    const classes = useStyles();

    useEffect(()=>{
        socket.emit('getAdminSportsmens');
        socket.on('adminSportsmens', (data) => {
            data.forEach((el) => el['id'] = el['_id'])
            setSportsmens(data);
        })
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'name', headerName: 'ФИО тренера', width: 300 },
        { field: 'birthday', headerName: 'Дата рождения', width: 170 },
        { field: 'nowTraner', headerName: 'Личный тренер', width: 200 },
        { field: 'school', headerName: 'Школа', width: 200 },
        { field: 'telephone', headerName: 'Телефон', width: 150 },
      ];

    return (
        (JSON.parse(localStorage.getItem('admins')).filter(el=> el.user_id == localStorage.getItem('user')).length!=0)&&(<div>
            <div style={{display: 'flex',justifyContent: 'space-between'}}>
                <Typography variant="h3" component="h4" gutterBottom>
                    Спортсмены
                </Typography>

                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
            {(sportsmens)&&(
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
            )}
        </div>)
    )
}