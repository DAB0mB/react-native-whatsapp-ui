import * as graphql from 'graphql';
import user from './models/user';

const {
  GraphQLObjectType,
  GraphQLSchema
} = graphql;

const QueryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: user.queries.findById,
    users: user.queries.find
  })
});

const MutationType = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addUser: user.mutations.add
  })
});

export default new graphql.GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
