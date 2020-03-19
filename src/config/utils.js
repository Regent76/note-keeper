export default {
  getEnvOrDefault: (varName, defaultVal) => {
    return process.env[varName] || defaultVal;
  },

  getEnvOrPanic: (varName) => {
    if (typeof process.env[varName] === undefined || !process.env[varName]) {
      throw new Error(`ERROR: Environment variable not specified: ${varName}`);
    }

    return process.env[varName];
  }
};
