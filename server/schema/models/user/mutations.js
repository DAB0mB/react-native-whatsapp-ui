import * as graphql from 'graphql';
import UserModel from './model';
import UserType from './type';

const {
  GraphQLNonNull,
  GraphQLString
} = graphql;

const addUser = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, fields) => {
    const user = new UserModel(fields);

    return user.save();
  }
};

export default {
  add: addUser
};
