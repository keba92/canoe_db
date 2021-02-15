import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


export default function EntriePage() {
    const entrie = JSON.parse(localStorage.getItem('entrie'));
    const discepline = JSON.parse(entrie.sportsmensList);
    const today = Date.now()
    return (
        <div>
            {(new Date(entrie.deadLine)>= new Date(today))&&(<div style={{float: 'right'}}>
                <Button variant="contained" color="primary" href="/createEntries">
                    Редактировать
                </Button>
            </div>)}
            {(entrie)&&(
                <div style={{display: 'flex', flexFlow: 'column', alignItems: 'center', margin: '10px'}}>
                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'start', margin: '10px'}}>
                        <div style={{display: 'flex', flexFlow: 'column', justifyContent: 'end', margin: '10px'}}>
                            <div>
                                <Typography variant="h3" component="h4" gutterBottom>
                                {entrie.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Начало соревнований: {entrie.startDate}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Окончание соревнований: {entrie.endDate}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Последний день принятия заявок: {entrie.endDate}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="h5" component="h6" gutterBottom>
                                    Контактные данные
                                </Typography>
                                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'start'}}>
                                    <Typography variant="body2" gutterBottom>
                                        Телефон Представителя команды: {entrie.telephone}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexFlow: 'column', justifyContent: 'end', margin: '10px'}}>
                        <Typography variant="body1" gutterBottom>
                            Представитель команды: <b>{entrie.traner}</b>
                        </Typography>
                    </div>
                    <div style={{display: 'flex', justifyContent:'space-between'}}>
                            {Object.keys(discepline).map((keyName) => {
                            return (
                                <div style={{display: 'flex', flexFlow: 'column', marginRight: '20px', marginTop: '3px', borderRight: '1px solid gray'}}>
                                    <Typography variant="body1" gutterBottom>
                                        <b>{keyName}</b>
                                        <hr/>
                                    </Typography>
                                    {discepline[keyName].map((el)=> {
                                    return (
                                        <div style={{display: 'flex', flexWrap: 'wrap', paddingRight: '10px'}}>
                                            <Typography variant="body2" gutterBottom>
                                                {el}
                                            </Typography>
                                        </div>
                                    )
                                })}
                                </div>   
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
