import ExampleModel from "../../../model/ExampleModel";

export default {
    Mutation: {
        createExample: (_, { label }) =>
            ExampleModel.create({ label }).then(() => true),
    },
};
