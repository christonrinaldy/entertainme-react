const axios = require("axios")
const { ApolloServer, gql } = require("apollo-server");
const Redis = require('ioredis')
const redis = new Redis()


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  
  type Movie {
    _id: ID,
    title: String
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  }

  input InputMovie {
    title: String
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  }

  extend type Query {
    getMovies: [Movie],
    getMovie(_id: ID): Movie,
    
  }


  extend type Mutation {
      postMovie(newMovie: InputMovie): Movie,
      delMovie(_id: ID): Movie,
      updateMovie(_id: ID, newMovie: InputMovie): Movie,
  }

`;
const resolvers = {
    Query: {
        getMovies: async () => {
          //kondisi 
          const moviesCache = await redis.get('movies')
          if (moviesCache) {
            //return JSON.parse(moviesCache)
            const {data} = await axios.get("http://localhost:3001/movies")
            await redis.set('movies',JSON.stringify(data))
            return data
          } else {
            const {data} = await axios.get("http://localhost:3001/movies")
            await redis.set('movies',JSON.stringify(data))
            return data
          }
            
        },
        getMovie: async (parents,args, context, info) => {
            const {_id} = await args
              const {data} = await axios.get(`http://localhost:3001/movies/${_id}`)
              return data
        }
    },
    Mutation: {
        postMovie: async (parents,args, context, info) => {
            const {newMovie} = args
            const {data} = await axios.post("http://localhost:3001/movies", newMovie)  
            //delete redisnya semua mutation
            await redis.del('movies')
            return data        
        },
        delMovie: async (parents,args, context, info) => {
            const {_id} = args
            const {data} = await axios.delete(`http://localhost:3001/movies/${_id}`)
            await redis.del('movies')
            return data
        },
        updateMovie: async (parents,args, context, info) => {
          const {_id, newMovie} = args
          const {data} = await axios.put(`http://localhost:3001/movies/${_id}`,newMovie)
          await redis.del('movies')
          return data
        }
        //---------------------------------------------------------------------------------------------
    }
}


module.exports = {typeDefs, resolvers}