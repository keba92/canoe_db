import React from 'react';
import { Image } from 'cloudinary-react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useAuth0 } from "@auth0/auth0-react";

export default function CompetitionPage() {
    const competition = JSON.parse(localStorage.getItem('competition'));
    const discepline = JSON.parse(competition.discepline);
    const { user, isAuthenticated } = useAuth0();
    return (
        <div>
            {(isAuthenticated)&&(<div style={{float: 'right'}}>
                {(JSON.parse(localStorage.getItem('admins')).filter(el=> el.user_id == user.sub).length!=0)&&(
                <Button variant="contained" color="primary" href="/createCompetition">
                    Редактировать
                </Button>)}
            </div>)}
            {(competition)&&(
                <div style={{display: 'flex', flexFlow: 'column', alignItems: 'center', margin: '10px'}}>
                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'start', margin: '10px'}}>
                        <Image cloud_name="dgeev9d6l" publicId={competition.logo} height="220" />
                        <div style={{display: 'flex', flexFlow: 'column', justifyContent: 'end', margin: '10px'}}>
                            <div>
                                <Typography variant="h4" component="h5" gutterBottom>
                                {competition.name}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Место проведения: {competition.place}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Начало соревнований: {competition.startDate}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Окончание соревнований: {competition.endDate}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Последний день принятия заявок: {competition.endDate}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="h5" component="h6" gutterBottom>
                                    Контактные данные
                                </Typography>
                                <div style={{display: 'flex', flexFlow: 'column', justifyContent: 'start'}}>
                                    <Typography variant="body2" gutterBottom>
                                        Главный судья: {competition.mainJudge}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Cекретарь соревнований: {competition.secretary}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Телефон: {competition.telephone}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexFlow: 'column', justifyContent: 'end', margin: '10px'}}>
                        <Typography variant="body1" gutterBottom>
                            {competition.description}
                        </Typography>
                    </div>
                    {discepline.map((el)=>{
                            return(
                                <div>
                                    <Typography variant="body2" gutterBottom key={el}>
                                        {el}
                                    </Typography>
                                </div>
                            )
                        })}
                </div>
            )}
        </div>
    )
}
