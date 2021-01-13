import React, { Component } from 'react'
import './PokemonList.css';
import '../../App.css';
import Card from '@material-ui/core/Card';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Pagination from '@material-ui/lab/Pagination';
import Grow from '@material-ui/core/Grow';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DetailPokemon from '../DetailPokemon/DetailPokemon';
/**
* @author
* @function PokemonList
**/


class PokemonList extends Component{

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      pokemons: [],
      grow: false,
      count:0,
      open:false,
      url:''
    };
  }

    componentDidMount() {
      const gqlQueryPokemon = `query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
          count
          next
          previous
          status
          message
          results {
            url
            name
            image
          }
        }
      }`;
      const gqlVariables = {
        limit: 20,
        offset: 0,
      };

        fetch("https://graphql-pokeapi.vercel.app/api/graphql",{
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: gqlQueryPokemon,
          variables: gqlVariables,
        
        }),
        method: 'POST',
      })
        .then(res => res.json())
        .then((result) => {
          this.setState({ 
            pokemons: result.data.pokemons.results, 
            grow:true,
            count:result.data.pokemons.count })
        })
        .catch(console.log)
      }

      setPage(value){
        const gqlQueryPokemon = `query pokemons($limit: Int, $offset: Int) {
          pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            status
            message
            results {
              url
              name
              image
            }
          }
        }`;

        const gqlVariables = {
          limit: 20,
          offset: (value-1)*20,
        };
        fetch("https://graphql-pokeapi.vercel.app/api/graphql",{
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: gqlQueryPokemon,
          variables: gqlVariables,
        
        }),
        method: 'POST',
      })
        .then(res => res.json())
        .then((result) => {
          this.setState({ 
            pokemons: result.data.pokemons.results, 
            grow:true,
            count:result.data.pokemons.count })
        })
        .catch(console.log)
      }


      render() {
        const {count}=this.state
        const handleOpenCloseDetail=(url)=>{
          const currentState = this.state.open
          this.setState({ open : !currentState,url:url})
        }
        const handleChange = (event, value) => {
          this.setPage(value);
        };
        var audienses = this.state.pokemons.map((tile,index) => (
          <Grow in={this.state.grow}>
                          <GridListTile className='gridTile' key={tile.name} >
                            <img src={tile.image} alt={tile.name} />
                            <GridListTileBar
                              className='gridListTileBar'
                              title={tile.name}   
                              actionIcon={
                                <IconButton className='icon' onClick={()=>handleOpenCloseDetail(tile.url)}>
                                  <InfoIcon />
                                </IconButton>
                              }
                            />
                        </GridListTile>
                        </Grow>
       ));
        return(
              <Card className='card'>
                  <div className='header'>
                      List Pokemon
                  </div>
                  <div className='search'>
                    Ini buat search
                  </div>
                  <div className='list'>
                    <Card className='card-value'>
                    <GridList cols={4} cellHeight={180} className='gridList'>
                      <GridListTile cols={4} style={{ height: 'auto' }}>
                      </GridListTile>
                        {audienses}
                     </GridList>
                     <div className='pagination'>
                     <Pagination count={(count/20).toFixed(0)} defaultPage={1} onChange={handleChange} boundaryCount={2} />
                     </div>
                     </Card>
                 </div>

                 <Dialog fullScreen open={this.state.open} onClose={handleOpenCloseDetail} >
                  <AppBar className='appBar'>
                    <Toolbar>
                      <IconButton edge="start" color="inherit" onClick={handleOpenCloseDetail} aria-label="close">
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="h6" className='title'>
                        Pokemon Detail
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <DetailPokemon url={this.state.url}/>
                </Dialog>
              </Card>
             )
      
      }
}

export default PokemonList;
