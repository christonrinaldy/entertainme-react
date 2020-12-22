import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client' 
import {BrowserRouter as Router,Route,Switch, Link} from 'react-router-dom'
import './App.css'
import {Movies, TvSeries, AddForm, FavoriteMovies, Home, Detail} from './pages'
import {favoriteMoviesVar} from './cache'
import {Navbar, Nav} from 'react-bootstrap'



function App() {
  
  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            favoriteMovies: {
              read() {
                return favoriteMoviesVar();
              }
            }
          }
        }
      }
    })
  })
  return (
    <ApolloProvider client = {client}>
      <Router>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/" >EntertainMe</Navbar.Brand>
            <Nav className="mr-auto justify-content-around">
              <Link exact= "true" to="/movies"> Movies</Link>
              <Link exact= "true" to="/favMovies">Favorites</Link>
              <Link exact= "true" to="/tvSeries">TV Series</Link>
            </Nav>
          </Navbar>
        <Switch>
          <Route exact path='/'
            component = {Home}
          />
          <Route 
            exact path='/movies'
            component = {Movies}
          />
          <Route exact path='/form'>
            <AddForm/>
          </Route>
          <Route exact path='/favMovies'>
            <FavoriteMovies></FavoriteMovies>
          </Route>
          <Route exact path='/tvSeries'>
            <TvSeries></TvSeries>
          </Route>
          <Route exact path='/detail/:id'
             component = {Detail}
          />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
