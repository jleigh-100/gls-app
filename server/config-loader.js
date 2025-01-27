const config = require('./config.json');
const env = process.env;

const loader = () => {
    const envConfig = { ...config };
    const allowedKeys = ['PORT'];
    for (const key of allowedKeys) {
        if (env[key]) {
            envConfig[key] = env[key];
        }
    }
    return envConfig;
}

module.exports = loader;