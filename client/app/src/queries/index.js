import {gql} from '@apollo/client'
export const FETCH_MOVIES = gql `
    query getMovies{
        getMovies {
          _id,
          title,
          overview,
          popularity,
          poster_path,
          tags
        }
      }
    `
export const FETCH_TVSERIES = gql`
query getTvSeries {
    getTvSeries {
      _id,
      title,
      overview,
      popularity,
      poster_path
    }
  }
`
export const FETCH_MOVIE = gql`
  query getMovie ($id: ID!) {
    getMovie(_id: $id) {
      _id,
      title,
      overview,
      popularity,
      poster_path,
      tags
    }
  }

`
    export const DELETE_MOVIE = gql `
    mutation delMovie ($id: ID!) {
      delMovie(_id: $id) {
        _id,
        title,
        overview,
        popularity,
        poster_path
      }
    }
    `
    export const DELETE_TVSERIES = gql`
    mutation delTevSeries ($id: ID!) {
        delTvSeries(_id: $id) {
          _id,
          title,
          overview,
          popularity,
          poster_path
        }
      }
    `
    export const ADD_MOVIE = gql`

    mutation postMovie ($title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String]!) {
        postMovie(newMovie: {
          title: $title,
          overview: $overview,
          poster_path: $poster_path,
          popularity: $popularity,
          tags: $tags
        }) {
          _id
          title
          overview
          popularity
          poster_path
        }
      }
    `
    export const GET_FAVORITE_MOVIES = gql`
        query GetFavoriteMovies {
            favoriteMovies @client
        }
        `
    export const UPDATE_MOVIE = gql `
      mutation updateMovie ($id: ID!, $title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String]!) {
        updateMovie (_id: $id, newMovie: 
          {
            title: $title
            overview: $overview,
            poster_path: $poster_path,
            popularity: $popularity,
            tags: $tags
          }
        ) {
          _id,
          title,
          overview,
          popularity,
          poster_path,
          tags
        }
      }
    `