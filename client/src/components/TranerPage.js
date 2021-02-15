import React, { useEffect, useState} from 'react';
import { Image } from 'cloudinary-react';
import TableSportsmens from './TableSportsmens';
import io from 'socket.io-client';
import Button from '@material-ui/core/Button';

export default function TranerPage() {
    const traner = JSON.parse(localStorage.getItem('traner'));
    const socket = io("http://localhost:3001/");
    const [sportsmens, setSportsmens] = useState(null);
    useEffect(()=>{
        socket.emit('getTranerSportsmens', { name : traner.name});
        socket.on('tranerSportsmens', (data) => {
            data.forEach((el) => el['id'] = el['_id'])
            setSportsmens(data);
        })
    }, [])
    return (
        <div>
            {(traner)&&(
                <div class="main-body">
                <div style={{ display:'flex', flexWrap:'nowrap'}}>
                <div class="row gutters-sm">
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <div class="card-body">
                        <div class="d-flex flex-column align-items-center text-center">
                            <Image cloud_name="dgeev9d6l" publicId={traner.foto}  width="250" />
                            <Button variant="contained" size="small" color="primary" style={{margin: '5px'}} onClick={
                                (e)=>{
                                    e.preventDefault();
                                    window.location.assign('/createTraner');
                                }}>
                                Редактировать
                            </Button>
                        </div>
                      </div>
                    </div>
                  <div class="col-md-8" style={{marginLeft:'-15px'}}>
                    <div class="card mb-3">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">ФИО</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            {traner.name}
                          </div>
                        </div>
                        <hr/>
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Год рождения</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            {traner.birthday}
                          </div>
                        </div>
                        <hr/>
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Принадлежность</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            {traner.school}
                          </div>
                        </div>
                        <hr/>
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Телефон</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                           {traner.telephone}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>   
                {(sportsmens)&&(<TableSportsmens sportsmens={sportsmens} />)}
                </div>
                </div>
            )}
        </div>
    )
}
