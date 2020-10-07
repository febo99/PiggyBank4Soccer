import React from 'react';
import './App.css';
import ls from 'local-storage';
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteIcon from '@material-ui/icons/Delete';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = JSON.parse(localStorage.getItem('players'));
  }

  deleteHandler = (event) =>{
    event.preventDefault();

    let allPlayers =JSON.parse(localStorage.getItem('players'));
    if(typeof allPlayers === 'object' && allPlayers !== null) allPlayers = Object.values(allPlayers);

    let counter = 0;
    for(let p of allPlayers){
      if(p.name === event.currentTarget.id){
        allPlayers.splice(counter, 1);
        break;
      }
      counter++;
    }
    localStorage.setItem('players', JSON.stringify(allPlayers));
    this.forceUpdate();
  }

  addPenaltyHandler = (event) => {
    event.preventDefault();

    let allPlayers =JSON.parse(localStorage.getItem('players'));
    if(typeof allPlayers === 'object' && allPlayers !== null) allPlayers = Object.values(allPlayers);

    let counter = 0;
    for(let p of allPlayers){
      if(p.name === event.currentTarget.id){
        allPlayers[counter].penalties++;
        break;
      }
      counter++;
    }
    localStorage.setItem('players', JSON.stringify(allPlayers));
    this.forceUpdate();
  }

  payPenaltyHandler = (event) => {
    event.preventDefault();

    let allPlayers =JSON.parse(localStorage.getItem('players'));
    if(typeof allPlayers === 'object' && allPlayers !== null) allPlayers = Object.values(allPlayers);

    let counter = 0;
    for(let p of allPlayers){
      if(p.name === event.currentTarget.id){
        
        if(allPlayers[counter].penalties - 1 >= 0){
          allPlayers[counter].paid++;
          allPlayers[counter].penalties--;
        } 
        break;
      }
      counter++;
    }
    localStorage.setItem('players', JSON.stringify(allPlayers));
    this.forceUpdate();
  }

  submitHandler = (event) =>{
    event.preventDefault();
    let allPlayers = JSON.parse(localStorage.getItem('players'));
    if(typeof allPlayers === 'object' && allPlayers !== null) allPlayers = Object.values(allPlayers);

    let allow = true;
    for(let p of allPlayers){
      if(p.name === event.target[0].value){
        allow = false;
        event.target[0].value = '';
        break;
      }
    }
    if(allow){
      allPlayers.push({name: event.target[0].value, penalties: 0, paid: 0})
      localStorage.setItem('players', JSON.stringify(allPlayers));
      event.target[0].value = '';
      this.forceUpdate();
    }

  }


  render(){
    const players = JSON.parse(localStorage.getItem('players'));
    const items = [];
    players.forEach((item) =>{
      items.push(<li>{item.name}</li>);
    });
    return ( 
    <div className="App">
      <header className="App-header">
        
        <p>
        Seznam igralcev
        </p>
        <Table>
          <TableContainer component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell>Ime in priimek</TableCell>
                <TableCell>Kazni</TableCell>
                <TableCell>Placano</TableCell>
                <TableCell>Moznosti</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell>
                    {(row.penalties)}€
                  </TableCell>
                  <TableCell>
                    {(row.paid)}€
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" id={row.name} onClick={this.addPenaltyHandler}  color="primary">
                      <AddIcon></AddIcon>
                    </Button>
                    <Button variant="contained" id={row.name} onClick={this.payPenaltyHandler}  color="primary">
                      <AttachMoneyIcon></AttachMoneyIcon>
                    </Button>
                    <Button variant="contained" color="primary" id={row.name} onClick={this.deleteHandler}>
                      <DeleteIcon></DeleteIcon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </Table>
        <form onSubmit={this.submitHandler}>
          <TextField id="filled-basic" label="Ime in priimek" variant="filled"  />
          <Button type='submit' variant="contained" color="primary">dodaj igralca</Button>
        </form>
      </header>
    </div>
  );
  }
}

export default App;
