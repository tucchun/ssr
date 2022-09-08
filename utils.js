// const chalk = require("chalk");

const logMessage = (message, level) => {
  const color =
    level === "error"
      ? "red"
      : level === "warning"
      ? "yellow"
      : level === "info"
      ? "blue"
      : "white";
  console.log(`[${new Date().toISOString()}]`, message);
};

const compilerPromise = (name, compiler) => {
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      logMessage(`[${name}] Compiling `);
    });
    compiler.hooks.done.tap(name, (stats) => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      return reject(`Failed to compile ${name}`);
    });
  });
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const clientOnly = () => process.argv.includes("--client-only");

// export default {
//   clientOnly,
//   compilerPromise,
//   logMessage,
//   sleep,
// };

module.exports = {
  clientOnly,
  compilerPromise,
  logMessage,
  sleep,
};
