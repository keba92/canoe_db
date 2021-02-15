import { Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
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

export default function CreateEntries() {
    const socket = io();
    const classes = useStyles();
    const [sportsmens, setSportsmens] = useState([]);
    const [competitions, setCompetitions] = useState(null);
    const [traners, setTraners] = useState(null);
    const [selectCompetition, setSelectCompetition] = useState(null);
    const [selectTraner, setSelectTraner] = useState(null);
    const [selectSportsmens, setSelectSportsmens] = useState({});
    const [discepline, setDiscepline] = useState([]);
    const [selectDiscepline, setSelectDiscepline] = useState(null);
    const [choiseSportsmen, setChoiseSportsmen] = useState(null);
    const [entrie, setEntrie] = useState({});
    const [self, setSelf] = useState(false);
    const { user } = useAuth0();
    const today = Date.now();

    useEffect(()=>{
        socket.emit('getCompetition');
        socket.on('competition', (data)=>{
            setCompetitions(data);
        })
        socket.emit('getSportsmens', { idSchool : localStorage.getItem('user')});
        socket.on('sportsmens', (data) => {
            setSportsmens(data);
        })
        socket.emit('getTraners', { idSchool : localStorage.getItem('user')});
        socket.on('traners', (data) => {
            setTraners(data);
        })
        try {
            const editEntrie = localStorage.getItem('entrie');
            if(editEntrie) {
              const data = JSON.parse(editEntrie);
              setEntrie(data);
              setSelectCompetition(data.idCompetition);
              setSelectTraner(data.traner);
              setSelectSportsmens(JSON.parse(data.sportsmensList));
              setDiscepline(JSON.parse(data.discepline));
            }
            localStorage.clear();
          } catch(e) {
            console.log(e);
          }
    },[])

    const makeDiscepline = (id) => {
            const competition = competitions.filter((el) => el._id == id);
            setDiscepline(JSON.parse(competition[0].discepline))
            JSON.parse(competition[0].discepline).forEach(e => {
                selectSportsmens[e] = [];
            });
            setSelectSportsmens(selectSportsmens)
    }

    const Delete = (e) => {
        e.preventDefault();
        if(e.target.id){
            selectSportsmens[e.target.id].splice(e.target.name, 1);
            setSelectSportsmens(selectSportsmens);
        }
        setSelectSportsmens(selectSportsmens);
        setSelectDiscepline('');
    }

    const sendData = (e) => {
        e.preventDefault();
        const telephone = traners.filter((el) => el.name == selectTraner)
        if(selectDiscepline&&selectSportsmens&&selectTraner&&selectCompetition){
            const today = new Date();
            const data = {
                idCompetition: selectCompetition,
                idSchool: user.sub,
                traner: selectTraner,
                telephone: telephone[0].telephone,
                dateSend: today.toUTCString(),
                sportsmensList: JSON.stringify(selectSportsmens)
            }
            socket.emit('addEntries', data);
        } else {
            alert('Не введены данные!')
        }
    }

    const editData = (e) => {
        e.preventDefault();
        const telephone = traners.filter((el) => el.name == selectTraner)
        const today = new Date();
        const data = {
            _id: entrie._id,
            idCompetition: selectCompetition,
            idSchool: user.sub,
            traner: selectTraner,
            telephone: telephone[0].telephone,
            dateSend: today.toUTCString(),
            sportsmensList: JSON.stringify(selectSportsmens)
        }
        socket.emit('editEntries', data);
    }

    const table = () =>{
            return (<div style={{display: 'flex', justifyContent:'space-between'}}>
                {Object.keys(selectSportsmens).map((keyName) => {
                return (
                    <div style={{display: 'flex', flexFlow: 'column', margin: '3px'}}>
                        <Typography variant="body1" gutterBottom>
                            <b>{keyName}</b>
                            <hr/>
                        </Typography>
                        {selectSportsmens[keyName].map((el, index)=> {
                        return (
                            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                <Typography variant="body2" gutterBottom>
                                    {el}
                                </Typography>
                                <IconButton aria-label="delete" id={keyName} name={index} onClick={Delete}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        )
                    })}
                    </div>   
                )
            })}
        </div>
        )
    }

    return(
        <div>
            <div style={{display: 'flex', flexFlow: 'column', alignItems: 'center', margin: '10px'}}>
                <Typography variant="h6" component="h7" gutterBottom>
                    Выберите мероприятие
                </Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel>Выберите мероприятие</InputLabel>
                    <Select
                    value={selectCompetition}
                    onChange={(e) => {
                        makeDiscepline(e.target.value)
                        setSelectCompetition(e.target.value)
                    }}
                    >
                    <MenuItem value="">
                        None
                    </MenuItem>
                    {(competitions)&&(competitions.map((el)=>{
                        if(new Date(el.deadLine)>= new Date(today)) {
                            return  <MenuItem value={el._id}>{el.name}</MenuItem>
                        }  
                    }))}
                    </Select>
                </FormControl>
            </div>
            {(selectCompetition)&&(<div style={{display: 'flex', flexFlow: 'column', alignItems: 'center', margin: '10px'}}>
                <Typography variant="h6" component="h7" gutterBottom>
                    Выберите руководителя делигации
                </Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel>Выберите руководителя делигации</InputLabel>
                    <Select
                    value={selectTraner}
                    onChange={(e) => setSelectTraner(e.target.value)}
                    >
                    <MenuItem value="">
                        None
                    </MenuItem>
                    {(traners)&&(traners.map((el)=>{
                       return  <MenuItem value={el.name}>{el.name}</MenuItem>
                    }))}
                    </Select>
                </FormControl>
            </div>)}
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'start'}}>
            {(selectTraner)&&(<div style={{display: 'flex', flexFlow: 'column', alignItems: 'center', margin: '10px'}}>
                <Typography variant="h6" component="h7" gutterBottom>
                    Выберите класс лодки
                </Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel>Выберите класс лодки</InputLabel>
                    <Select
                    value={selectDiscepline}
                    onChange={(e) => setSelectDiscepline(e.target.value)}
                    >
                    <MenuItem value="">
                        None
                    </MenuItem>
                    {discepline.map((el)=>{
                       return  <MenuItem value={el}>{el}</MenuItem>
                    })}
                    </Select>
                </FormControl>
            </div>)}
            {(selectTraner)&&(<div style={{display: 'flex', flexFlow: 'column', alignItems: 'center', margin: '10px'}}>
                <Typography variant="h6" component="h7" gutterBottom>
                    Выберите спортсмена
                </Typography>
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'start'}}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Выберите спортсмена</InputLabel>
                        <Select
                        onChange={(e) => setChoiseSportsmen(e.target.value)}>
                        <MenuItem value="">
                            None
                        </MenuItem>
                        {sportsmens.map((el)=>{
                        return  <MenuItem value={el.name}>{el.name}</MenuItem>
                        })}
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={self}
                            onChange={e=> setSelf(e.target.checked)}
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Лично"
                    />
                    <Button variant="contained" color="primary" onClick={(e)=>{
                            e.preventDefault();
                            let nameSportsmen;
                            (self)?(nameSportsmen = choiseSportsmen+' (Л)'):(nameSportsmen= choiseSportsmen)
                            selectSportsmens[selectDiscepline] = [...selectSportsmens[selectDiscepline], nameSportsmen]
                            setSelectSportsmens((prev) => prev = selectSportsmens );
                            setChoiseSportsmen('');
                    }}>
                        Добавить
                    </Button>
                </div>
            </div>)}
            { (selectTraner)&&(table())}
        </div>
        {(selectDiscepline&&!entrie.traner)&&(<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <Button variant="contained" color="primary" onClick={sendData}>
                Отправить заявку
            </Button> 
        </div>)}
        {(entrie.traner)&&(<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <Button variant="contained" color="primary" onClick={editData}>
                Редактировать заявку
            </Button> 
        </div>)} 
    </div>
    )
}