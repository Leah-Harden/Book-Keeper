const { v4: uuidv4 } = require('uuid');
const User = require('../models/User')
const users = [];

const resolvers = {
  Query: {
    getUser: async (parent, { id }, context) => {
      if (context.user) {

        return await User.findOne({ _id: context.user._id });
      }
    }
  },
  Mutation: {
    createUser: (parent, { username, email, password }) => {
      const newUser = {
        id: uuidv4(),
        username,
        email,
        password,
        savedBooks: []
      };
      users.push(newUser);
      return newUser;
    },
    saveBook: (parent, { userId, book }) => {
      const user = User.find(user => user.id === userId);
      if (!user) {
        throw new Error('User not found');
      }
      const newBook = {
        id: uuidv4(),
        ...book
      };
      user.savedBooks.push(newBook);
      return user;
    }
  },
  User: {
    savedBooks: (parent) => {
      // Resolve savedBooks for a user
      return parent.savedBooks;
    }
  }
};

module.exports = resolvers;
