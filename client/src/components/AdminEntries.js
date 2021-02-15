import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { CSVLink } from "react-csv";

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 500,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
  }));

export default function AdminEntries() {
    const socket = io();
    const [competitions, setCompetitions] = useState(null);
    const [select, setSelect] = useState(null);
    const [entries, setEntries] = useState(null);
    const [choiseEntries, setChoiseEntries] = useState(null);
    const [schools, setSchools] = useState(null);
    const [newDataCSV, setNewDataCSV] = useState(null);
    const [sportCSV, setSportCSV] = useState(null);
    const [boatClass, setBoatClass] = useState(null);
    const classes = useStyles();

    useEffect(()=>{
        socket.emit('getCompetition');
        socket.on('competition', (data)=>{
            setCompetitions(data);
        })
        socket.emit('getAdminEntries');
        socket.on('adminEntries', (data)=>{
            data.forEach((el) => el['id'] = el['_id'])
            setEntries(data);
        })
        socket.emit('getAdminSchools');
        socket.on('adminSchools', (data) => {
            setSchools(data);
        })
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'nameCompetition', headerName: 'Название мероприятия', width: 370 },
        { field: 'school', headerName: 'Школа', width: 350 },
        { field: 'deadLine', headerName: 'Прием заявок до', width: 180 },
        { field: 'dateSend', headerName: 'Дата получения', width: 220 },
      ];

    const headersCSV = [
        { label: "Команда", key: "school" },
        { label: "Класс лодки", key: "classBoat" },
        { label: "Спортсмен", key: "sportsmen" }
      ];
    
    const headersSport = [
        { label: "Команда", key: "school" },
        { label: "Спортсмен", key: "sportsmen" }
      ];
    
      const headersClass = [
        { label: "Класс лодки", key: "classBoat" }
      ];

    const findEntries = (id) =>{
        competitions.forEach((el) => {
            if(el._id == id) {
                const obj = el;
                const data = entries.filter((elem) =>elem.idCompetition==id);
                data.forEach((element) => {
                    const idSchool = schools.filter((elem) => {
                        if(element.idSchool == elem.idUser){
                            return elem.name;
                        }
                    })
                    element['school'] = idSchool[0].name;
                    element['nameCompetition'] = obj.name;
                    element['startDate'] = obj.startDate;
                    element['endDate'] = obj.endDate;
                    element['deadLine'] = obj.deadLine;
                })
                setChoiseEntries(data);
            }
        })
    }

    const dataCSV = () =>{
        const arr = [];
        choiseEntries.forEach((obj) => {
            const entry = JSON.parse(obj.sportsmensList);
            Object.keys(entry).forEach((keyName)=> {
                entry[keyName].forEach((el) => {
                    const inner = {
                        school: obj.school,
                        classBoat: keyName,
                        sportsmen: el
                    }
                    arr.push(inner);
                })
            })
        })
        setNewDataCSV(arr);
    }

    const sportsmenCSV = () =>{
        const arr = [];

        choiseEntries.forEach((obj) => {
            const entry = JSON.parse(obj.sportsmensList);
            const uniq = [...new Set(Object.values(entry).flat())];
            uniq.forEach((el)=>{
                const inner = {
                    school: obj.school,
                    sportsmen: el
                }
                arr.push(inner)    
            })
        })
        setSportCSV(arr);
    }

    const classBoat = () => {
        const arr = [];
        const comp = competitions.filter(el => el._id == select);
        const obj = JSON.parse(comp[0].discepline);
        obj.forEach(el=>{
            const inner = {
                classBoat: el
            }
            arr.push(inner)
        })
        setBoatClass(arr)
    }

    return (
        <div>
            <div style={{display: 'flex',justifyContent: 'space-between'}}>
                <Typography variant="h3" component="h4" gutterBottom>
                    Заявки
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

            

            <div style={{display: 'flex', flexFlow: 'column', alignItems: 'center', margin: '10px'}}>
                <Typography variant="h6" component="h7" gutterBottom>
                    Выберите мероприятие
                </Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel>Выберите мероприятие</InputLabel>
                    <Select
                    value={select}
                    onChange={(e) =>{
                        setSelect(e.target.value)
                        findEntries(e.target.value)
                    }}
                    >
                    <MenuItem value="">
                        None
                    </MenuItem>
                    {(competitions)&&(competitions.map((el)=>{
                       return  <MenuItem value={el._id}>{el.name}</MenuItem>
                    }))}
                    </Select>
                </FormControl>
                {(newDataCSV)&&(<CSVLink data={newDataCSV} headers={headersCSV} className='csv-link' filename="collection.csv" separator={';'}>
                    Скачать Команда+Класс+Спортсмен
                </CSVLink>)}
                {(sportCSV)&&(<CSVLink data={sportCSV} headers={headersSport} className='csv-link' filename="collection.csv" separator={';'}>
                    Скачать Команда+Спортсмен
                </CSVLink>)}
                {(sportCSV)&&(<CSVLink data={boatClass} headers={headersClass} className='csv-link' filename="collection.csv" separator={';'}>
                    Скачать Класс лодок
                </CSVLink>)}
            </div>
            
           
            {(choiseEntries)&&(
                <div style={{ height: 500, width: '100%' }}>
                    {(!newDataCSV)&&(dataCSV())}
                    {(!newDataCSV)&&(sportsmenCSV())}
                    {(!newDataCSV)&&(classBoat())}
                    <DataGrid 
                        rows={choiseEntries} 
                        columns={columns} 
                        pageSize={15}
                        className='table-style'
                        onRowClick={(e)=>{
                            window.location.assign('/entrie');
                            localStorage.setItem('entrie', JSON.stringify(e.row))
                        }}/>
                </div>
            )}
        </div>
    )
}