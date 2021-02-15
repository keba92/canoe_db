import React from 'react';
import { Image } from 'cloudinary-react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

export default function SportsmenPage() {
    const sportsmen = JSON.parse(localStorage.getItem('sportsmen'));
    const result = JSON.parse(sportsmen.listResults);
    result.forEach((el,idx) => el['id'] = idx+1)
    return (
        <div>
            {(sportsmen)&&(
              <div class="main-body">
                <div style={{ display:'flex', flexWrap:'nowrap'}}>
                <div class="row gutters-sm">
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <div class="card-body">
                        <div class="d-flex flex-column align-items-center text-center">
                            <Image cloud_name="dgeev9d6l" publicId={sportsmen.foto}  width="250" />
                            <Button variant="contained" size="small" color="primary" style={{margin: '5px'}} onClick={
                                (e)=>{
                                    e.preventDefault();
                                    window.location.assign('/createSportsmen');
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
                            {sportsmen.name}
                          </div>
                        </div>
                        <hr/>
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Год рождения</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            {sportsmen.birthday}
                          </div>
                        </div>
                        <hr/>
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Принадлежность</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            {sportsmen.school}
                          </div>
                        </div>
                        <hr/>
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Личный тренер</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            {sportsmen.nowTraner}
                          </div>
                        </div>
                        <hr/>
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Первый тренер</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            {sportsmen.fTraner}
                          </div>
                        </div>
                        <hr/>
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Телефон</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            {sportsmen.telephone}
                          </div>
                        </div>
                        <hr/>
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">Адрес прописки</h6>
                          </div>
                          <div class="col-sm-9 text-secondary">
                            {sportsmen.adress}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                
                {result.map((el,index)=>{
                            const columns = [
                                { field: 'id', headerName: 'ID', width: 70 },
                                { field: 'competition', headerName: 'Спортивное мероприятие', width: 350 },
                                { field: 'discipline', headerName: 'Класс лодки', width: 140 },
                                { field: 'place', headerName: 'Место', width: 100 },
                              ];
                            return(
                                <div style={{ height: 500, width: '100%' }}>
                                <DataGrid 
                                    rows={result} 
                                    columns={columns}
                                    className='table-style'
                                    pageSize={15} />
                                </div>
                            )
                        })}
                </div>
            </div>
            )}
        </div>        
    )
}
