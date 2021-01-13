import React, { Component } from 'react'
import './DetailPokemon.css';
import '../../App.css';
import { Card, Grid, Paper } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grow from '@material-ui/core/Grow';

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
      
    };
  }

    componentDidMount() {
      console.log(this.props)
      fetch(this.props.url)
        .then(res => res.json())
        .then((result) => {
          this.setState({ 
            pokemon: result, 
            grow:true})
        })
        .catch(console.log)
      }



      render() {
        const {pokemon}=this.state
        const image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+pokemon.id+".png"
        console.log(pokemon)
        return(
          <Card className='card'>
          <Grid container spacing={3} className='grid'>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <Paper>
              test
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              grid
            </Paper>
          </Grid>
          </Grid>
          </Card>
        )
      }
 }

export default DetailPokemon;