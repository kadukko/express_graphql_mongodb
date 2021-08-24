export default {
    Mutation: {
        setExample: (_, { text }) => {
            console.log(text);
            return true;
        },
    },
};
