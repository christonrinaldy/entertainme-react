import React from 'react'
import {favoriteMoviesVar} from '../cache'
import {MovieCard} from '../components'
import { CardDeck } from 'react-bootstrap'

export default function favoriteMovies() {
    const fav_movies = favoriteMoviesVar()
    return (
        <div className="container">
            <CardDeck aria-colspan= "3">
            {fav_movies.map((movie,index) => {
                return (
                    <MovieCard
                        key = {index}
                        data = {movie}
                    />
                )
            })}
        </CardDeck>
        </div>
        
    )
}