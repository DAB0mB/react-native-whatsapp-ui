import * as graphql from 'graphql';
import UserModel from './model';
import UserType from './type';

const {
  GraphQLID,
  GraphQLList
} = graphql;

const findUserById = {
  type: UserType,
  args: {
    id: {
      type: GraphQLID
    }
  },
  resolve: UserModel.findById
};

const findUsers = {
  type: new GraphQLList(UserType),
  resolve: UserModel.find
};

export default {
  findById: findUserById,
  find: findUsers
};
