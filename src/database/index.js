import mongoose, { connect } from "mongoose";
import EnvironmentModule from "../modules/EnvironmentModule";

let autoReconnect = null;

const database = () => ({
    async start() {
        const connect = () => {
            console.log("Trying to connect to the database...");

            return mongoose
                .connect(EnvironmentModule.getMongoUri(), {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
                .then(() => {
                    console.log("Connection established to database.");
                })
                .catch(() => {
                    console.log(
                        "Could not connect to database. Retrying in 30 seconds!"
                    );
                });
        };

        await connect();

        if (autoReconnect) {
            clearInterval(autoReconnect);
        }

        autoReconnect = setInterval(() => {
            if (!this.isConnected()) {
                connect();
            }
        }, 30000);
    },
    isConnected() {
        return mongoose.connection.readyState === 1;
    },
});

export default database();
