import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Calendary from './Calendary';
import MySchool from './MySchool';
import CreateEditSchool from './CreateEditScholl';
import MySportsmens from './MySportsmens';
import CreateSportsmen from './CreateSportsmen';
import SportsmenPage from './SportsmenPage';
import MyTraners from './MyTraners';
import CreateTraner from './CreateTraner';
import TranerPage from './TranerPage';
import CreateCompetition from './CreateCompetition';
import CompetitionPage from './CompetitionPage';
import CreateEntries from './CreateEntries';
import MyEntries from './MyEntries';
import EntriePage from './EntriePage';
import AdminSchools from './AdminSchools';
import AdminTraners from './AdminTraners';
import AdminSportsmens from './AdminSportsmens';
import AdminEntries from './AdminEntries';
import AdminPage from './AdminPage';
import PrivateRoute from './PrivateRoute';
import ImportResult from './ImportResults';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));
function Dashboard() {
    const classes = useStyles();
    const socket = io();
    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
    
    useEffect(()=>{
      socket.emit('getAdmins', {message: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImpBWjNnb0I3NTAxX2lOcXB4azIwNiJ9.eyJpc3MiOiJodHRwczovL2Rldi0zbmlnLTAzZS5ldS5hdXRoMC5jb20vIiwic3ViIjoiQ3NmdVpJYkdUM0RLa1UzMFlJdnU0dTVaZ1hYUlZCaG1AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTNuaWctMDNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjEzMjg2NzYyLCJleHAiOjE2MTQxNTA3NjIsImF6cCI6IkNzZnVaSWJHVDNES2tVMzBZSXZ1NHU1WmdYWFJWQmhtIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.k29fnV6V2jdwED15PuHsFqMf4AdVKY1do_DCj6wbjbhrgRM0iFrOwKXYr_-cD_YRkayUwIuT1uc5f7EY6khdXrzPFGwKiEoDR38hhRAB7oNuN-63MFzYs4avo5k5WUNNrGQKoUpz0acISbsMQ38gA6N_ItqpNA1M4pLiyuUOu4EBRAPzLTp6697fXnK8nfBCdiSLoD0GkGDXQrWhRaW1U5H4BLWVHQxzl34gOMwoVGyqnU9XQS4bV176T8NKrlRpBaW5bB5xkd7iikkuj2nBiJoDFDjYOHrrPv2uGwnB6pFPAmCgvhlDWUJN4aHSdBX2BasKzirTzT_qumMHVFVJMw'});
      socket.on('getAdminsData', (data) => {
        localStorage.setItem('admins', JSON.stringify(data));
      })
    }, [])

  return (
    <Router>
    <Switch>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ display: 'flex',justifyContent: 'space-between'}}>
          <Typography variant="h6" noWrap>
            Belarus Canoe DB
          </Typography>
          <div style={{display: 'flex'}}>
            {(!isAuthenticated)&&(<Button variant="contained" onClick={() => loginWithRedirect()}>Войти или Зарегистрироваться</Button>)}
            {(isAuthenticated)&&(<Button variant="contained" onClick={() => {
              logout({ returnTo: window.location.origin })
              localStorage.clear();
              }}>Выйти</Button>)}
            {(isAuthenticated)&&(
              <div style={{ display: 'flex', marginLeft: '10px'}}>
                <img src={user.picture} alt={user.name} style={{width: '45px', marginRight: '10px'}}/>
                <p>{user.name}</p>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          {isAuthenticated&&(localStorage.setItem('user', user.sub))}
          {(isAuthenticated&&JSON.parse(localStorage.getItem('admins')).filter(el=> el.user_id == localStorage.getItem('user')).length!=0)&&(<List>
            {['Школы', 'Тренера', 'Спортсмены', 'Календарь', 'Заявки', 'Админка', 'Загрузка результатов'].map((text, index) => {
              if(text == 'Школы'){
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <Link to='/adminSchools'>Школы</Link>
                  </ListItem>
                )
              } else if(text == 'Тренера'){
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <Link to='/adminTraners'>Тренера</Link>
                  </ListItem>
                )
              } else if(text == 'Спортсмены'){
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <Link to='/adminSportsmens'>Спортсмены</Link>
                  </ListItem>
                )
              } else if(text == 'Календарь'){
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <Link to='/calendary'>Календарь</Link>
                  </ListItem>
                )
              } else if(text == 'Заявки'){
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <Link to='/adminEntries'>Заявки</Link>
                  </ListItem>
                )
              } else if(text == 'Админка'){
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <Link to='/adminPage'>Админка</Link>
                  </ListItem>
                )
              } else if(text == 'Загрузка результатов'){
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <Link to='/adminImportFile'>Загрузка результатов</Link>
                  </ListItem>
                )
              } else {
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              }  
          })}
          </List>)}
          {(isAuthenticated&&JSON.parse(localStorage.getItem('admins')).filter(el=> el.user_id == localStorage.getItem('user')).length==0)&&(<List>
            {['Моя Школа', 'Мои Спортсмены', 'Тренерский состав', 'Календарь соревнований', 'Сформировать заявку'].map((text, index) =>{
              if(text == 'Календарь соревнований'){
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <Link to='/calendary'>Календарь соревнований</Link>
                  </ListItem>
                )
              } else if(text == 'Моя Школа'){
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <Link to='/mySchool'>Моя Школа</Link>
                  </ListItem>
                )
              } else if(text == 'Мои Спортсмены'){
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <Link to='/mySportsmens'>Мои Спортсмены</Link>
                  </ListItem>
                )
              } else if(text == 'Тренерский состав'){
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <Link to='/myTraners'>Тренерский состав</Link>
                  </ListItem>
                )
              } else if(text == 'Сформировать заявку'){
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <Link to='/myEntries'>Сформировать заявку</Link>
                  </ListItem>
                )
              } else {
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              }  
            })}
          </List>)}
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
          <PrivateRoute exact path="/calendary" component={Calendary} />
          <PrivateRoute exact path="/competition" component={CompetitionPage} />
          <PrivateRoute exact path="/createCompetition" component={CreateCompetition} />
          <PrivateRoute exact path="/mySchool" component={MySchool}/>
          <PrivateRoute exact path="/createEditSchool" component={CreateEditSchool}/>
          <PrivateRoute exact path="/mySportsmens" component={MySportsmens}/>
          <PrivateRoute exact path="/createSportsmen" component={CreateSportsmen} />
          <PrivateRoute exact path="/sportsmen" component={SportsmenPage} />
          <PrivateRoute exact path="/myTraners" component={MyTraners} />
          <PrivateRoute exact path="/createTraner" component={CreateTraner}/>
          <PrivateRoute exact path="/traner" component={TranerPage} />
          <PrivateRoute exact path="/myEntries" component={MyEntries} />
          <PrivateRoute exact path="/createEntries" component={CreateEntries} />
          <PrivateRoute exact path="/entrie" component={EntriePage} />
          <PrivateRoute exact path="/adminSchools" component={AdminSchools}/>
          <PrivateRoute exact path="/adminTraners" component={AdminTraners} />
          <PrivateRoute exact path="/adminSportsmens" component={AdminSportsmens} />
          <PrivateRoute exact path="/adminEntries" component={AdminEntries} />
          <PrivateRoute exact path="/adminPage" component={AdminPage} />
          <PrivateRoute exact path="/adminImportFile" component={ImportResult} />
      </main>
    </div>
    </Switch>
  </Router>
  );
}

export default Dashboard;