const { v4: uuidv4 } = require('`uuid');
const User = require('../models/User')

const resolvers = {
  Query: {
    getUser: async (parent, { id }, context) => {
      if (context.user) {

        return await User.findOne({ _id: context.user._id });
      }
    }
  },
  Mutation: {
    createUser: (context, { username, email, password }) => {
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
    saveBook: (context, { userId, book }) => {
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
    },
    savedBooks: (context) => {
      // Resolve savedBooks for a user
      return context.savedBooks;
    }

  }
};

module.exports = resolvers
