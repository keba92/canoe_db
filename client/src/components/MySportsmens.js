import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Typography from '@material-ui/core/Typography';
import TableSportsmens from './TableSportsmens';
import Button from '@material-ui/core/Button';

export default function MySportsmens() {
    const socket = io();
    const [sportsmens, setSportsmens] = useState(null);
    useEffect(()=>{
        socket.emit('getSportsmens', { idSchool : localStorage.getItem('user') });
        socket.on('sportsmens', (data) => {
            data.forEach((el) => el['id'] = el['_id'])
            setSportsmens(data);
        })
    }, [])

    return (
        <div>
            <div style={{float: 'right'}}>
                <Button variant="contained" color="primary" href="/createSportsmen">
                    Добавить спортсмена
                </Button>
            </div>
            <Typography variant="h3" component="h4" gutterBottom>
                Мои спортсмены
            </Typography>
            {(sportsmens)&&(<TableSportsmens sportsmens={sportsmens} />)}
        </div>
    )
}