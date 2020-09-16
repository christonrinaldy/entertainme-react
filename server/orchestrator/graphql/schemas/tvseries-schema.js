const axios = require("axios")
const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  
  type TvSeries {
    _id: ID,
    title: String
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  }

  input InputTvSeries {
    title: String
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: String
  }

  extend type Query {
    getTvSeries: [TvSeries],
    getTvSeriesById(_id: ID): TvSeries,

  }


  extend type Mutation {
      postTvSeries(newTvSeries: InputTvSeries): TvSeries,
      delTvSeries(_id: ID): TvSeries,
      updateTvSeries(_id: ID, newTvSeries: InputTvSeries): TvSeries,
  }

`;
const resolvers = {
    Query: {
        getTvSeries: async (parents,args, context, info) => {
          const {data} = await axios.get("http://localhost:3002/tvSeries/")
          return data
        },
        getTvSeriesById: async (parents,args, context, info) => {
            const {_id} = args
            const {data} = await axios.get(`http://localhost:3002/tvSeries/${_id}`)
            return data 
        }
    },
    Mutation: {
        //-----------------------------------------------------------------------------------------------
        postTvSeries: async (parents,args, context, info) => {
          const {newMovie} = args
            const {data} = await axios.post("http://localhost:3002/tvSeries", newMovie)  
            return data 
        },
        delTvSeries: async (parents,args, context, info) => {
          const {_id} = args
          const {data} = await axios.delete(`http://localhost:3002/tvSeries/${_id}`)
          return data
        },
        updateTvSeries: async (parents,args, context, info) => {
          const {_id, newMovie} = args
          const {data} = await axios.put(`http://localhost:3002/tvSeries/${_id}`,newMovie)
          return data
        }
    }
}

module.exports = {typeDefs, resolvers}