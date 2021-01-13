import React, { Component } from 'react'
import './DetailPokemon.css';
import '../../App.css';
import { Card, Grid, Paper } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import dataType from '../../assets/datas/DataType.js';

/**
* @author
* @function DetailPokemon
**/

class DetailPokemon extends Component{
 
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      pokemon: [],
      grow: false,
      abilities:[],
      tipe:[],
      stats:[]
    };
  }

    componentDidMount() {
      console.log(this.props)
      fetch(this.props.url)
        .then(res => res.json())
        .then((result) => {
          this.setState({ 
            pokemon: result, 
            abilities :result.abilities,
            tipe : result.types,
            stats : result.stats,
            grow:true})
        })
        .catch(console.log)
      }



      render() {
        const {pokemon}=this.state
        const image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+pokemon.id+".png"
        console.log(pokemon)
        var audienses = this.state.abilities.map((tile,index) => (
          <ul>
            <li>
              {tile.ability.name}
            </li>
          </ul>
       ));
       let color = []
       let backGround = []
       for(let i=0; i<dataType.length;i++){
         for(let j =0;j<this.state.tipe.length;j++){
           if(dataType[i].type===this.state.tipe[j].type.name){
             color[j]=dataType[i].color+" !important"
             backGround[j]=dataType[i].backgroundColor+" !important"
           }
         }
        }
        
       var type = this.state.tipe.map((tipe,index) =>(
            <Fab variant="extended" className='fab'>
              {tipe.type.name}
            </Fab>
       ));

       var stats = this.state.stats.map((stat,index) =>(
          <ul>
            <li>
              {stat.stat.name} : {stat.base_stat} /100
            </li>
          </ul>
       ));
        return(
          <Card className='card'>
          <Grid container spacing={3} className='grid'>
          <Grid item xs={12} sm={4}>
            <Paper className='pokedex-pokemon-profile'>
            <GridList cols={1} cellHeight={180} className='gridListDetail'>
            <Grow in={this.state.grow}>
              <GridListTile className='gridTileDetail' key={pokemon.id}  style={{ height: 'max-content !important', width: 'max-content !important' }}>
              <img src={image} alt={pokemon.name}  className='imagesDetail'/>
              </GridListTile>
            </Grow>
            </GridList>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper>
              <Grid container spacing={3} className='grid'>
                <Grid items xs={12} sm={5}>
                  <Typography variant="h5" gutterBottom>
                    Height
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                  {pokemon.height}"
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    Weight
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                  {pokemon.weight}lbs
                  </Typography>
              <Typography variant="h5" gutterBottom>
                Types
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {type}
              </Typography>
                </Grid>
                <Grid items xs={12} sm={6}>
                  <Typography variant="h5" gutterBottom>
                    Abilities
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {audienses}
                  </Typography>
              <Typography variant="h5" gutterBottom>
                Stats
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {stats}
              </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper>
            </Paper>
          </Grid>
          
          </Grid>
          </Card>
        )
      }
 }

export default DetailPokemon;