const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        thoughts: async (parent, { username }) => {
            // ternary operator to check if username exists
            // if it does, we set params to an object with a username key set to that value. 
            // if not, we return an empty object
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts')
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts')
        }
    }
};

module.exports = resolvers;