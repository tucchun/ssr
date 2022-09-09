const webpack = require("webpack");
var path = require("path");
const webpackDevServer = require("webpack-dev-server");
const nodemon = require("nodemon");
const memfs = require("memfs");
const { patchRequire } = require("fs-monkey");
const { logMessage, compilerPromise } = require("./utils");

const clientConfig = require("./webpack.config.client");
const serverConfig = require("./webpack.config.server");

async function start() {
  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers.find(
    (compiler) => compiler.name === "client"
  );
  const serverCompiler = multiCompiler.compilers.find(
    (compiler) => compiler.name === "server"
  );
  const devServer = new webpackDevServer(
    {
      port: 9000,
    },
    clientCompiler
  );

  await devServer.start();
  console.log(clientCompiler.outputFileSystem);
  // serverCompiler.outputFileSystem = memfs.createFsFromVolume(
  //   new memfs.Volume()
  // );
  const fs = (serverCompiler.outputFileSystem =
    clientCompiler.outputFileSystem);
  // const clientCompiler = webpack(clientConfig)

  serverCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
      return;
    }

    if (error) {
      logMessage(error, "error");
    }

    if (stats.hasErrors()) {
      const info = stats.toJson();
      const message = info.errors[0].message;
      logMessage(message);
    }
  });

  // new webpackDevServer(clientCompiler, {
  //   port: 9000,
  // });

  // const clientPromise = compilerPromise("client", clientCompiler);
  const serverPromise = compilerPromise("server", serverCompiler);

  // wait until client and server is compiled
  try {
    await serverPromise;
    // await clientPromise;

    console.log(clientCompiler.outputFileSystem);
    console.log(serverCompiler.outputFileSystem);
  } catch (error) {
    logMessage(error, "error");
  }
  const contents = fs.readFileSync(
    path.resolve(serverConfig.output.path, serverConfig.output.filename)
  );
  console.log(contents);
  patchRequire(fs);
  // console.log(file);
  // const script = nodemon({
  //   script: `./server.js`,
  //   ignore: [
  //     "src",
  //     "scripts",
  //     "config",
  //     "./*.*",
  //     "build/client",
  //     "**/locales",
  //     "**/tmp",
  //   ],
  //   delay: 200,
  // });

  // script.on("restart", () => {
  //   logMessage("Server side app has been restarted.", "warning");
  // });

  // script.on("quit", () => {
  //   console.log("Process ended");
  //   process.exit();
  // });

  // script.on("error", () => {
  //   logMessage("An error occured. Exiting", "error");
  //   process.exit(1);
  // });
}

start();
