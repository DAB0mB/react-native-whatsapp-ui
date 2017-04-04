import * as graphql from 'graphql';

const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = graphql;

export default new GraphQLObjectType({
  name: 'User',
  description: 'An example basic user type to begin with',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    }
  })
});
