require("dotenv").config();

const EnvironmentModule = () => ({
    get(key) {
        return process.env[key];
    },
    isDevelopment() {
        return !this.isProduction();
    },
    isProduction() {
        return this.get("NODE_ENV") === "production";
    },
    getPort() {
        return this.get("PORT") || 4000;
    },
    getCorsOrigin() {
        return this.get("CORS_ORIGIN") || this.getBaseUrl();
    },
    getPublicUrl() {
        return this.get("PUBLIC_URL") || this.getBaseUrl();
    },
    getBaseUrl() {
        return this.get("BASE_URL") || "http://localhost:3000";
    },
});

export default EnvironmentModule();
