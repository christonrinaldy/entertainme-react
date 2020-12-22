const movieSchema = require('./schemas/movie-schema')
const tvSeriesSchema = require('./schemas/tvseries-schema')
const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");

const typeDefs = gql`
  type Query,
  type Mutation
`;
const schema = makeExecutableSchema({
  typeDefs: [typeDefs, movieSchema.typeDefs, tvSeriesSchema.typeDefs],
  resolvers: [movieSchema.resolvers, tvSeriesSchema.resolvers]
})

const server = new ApolloServer({schema});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});