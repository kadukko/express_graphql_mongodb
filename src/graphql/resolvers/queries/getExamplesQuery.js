import ExampleModel from "../../../model/ExampleModel";

export default {
    Query: {
        getExamples: () => ExampleModel.find(),
    },
};
