const config = require('./config.json');

const loader = () => {
    const env = process.env;
    const envConfig = { ...config };
    const allowedKeys = ['CLIENT_PORT', 'SERVER_PORT'];
    for (const key of allowedKeys) {
        if (env[key]) {
            envConfig[key] = env[key];
        }
    }
    return envConfig;
}

module.exports = loader;