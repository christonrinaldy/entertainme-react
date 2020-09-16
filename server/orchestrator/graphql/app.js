const movieSchema = require('./schemas/movie-schema')
const tvSeriesSchema = require('./schemas/tvseries-schema')
const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Query,
  type Mutation
`;
const schema = makeExecutableSchema({
  typeDefs: [typeDefs, movieSchema.typeDefs, tvSeriesSchema.typeDefs],
  resolvers: [movieSchema.resolvers, tvSeriesSchema.resolvers]
})

const server = new ApolloServer({schema});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});