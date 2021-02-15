import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Typography from '@material-ui/core/Typography';
import TableSportsmens from './TableSportsmens';
import Button from '@material-ui/core/Button';
import { useAuth0 } from "@auth0/auth0-react";

export default function MySportsmens() {
    const socket = io("http://localhost:3001/");
    const [sportsmens, setSportsmens] = useState(null);
    const { user } = useAuth0();
    useEffect(()=>{
        socket.emit('getSportsmens', { idSchool : user.sub });
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