const { spawn } = require("child_process");

function runScript(scriptPath, args = [], io, channel) {
  return new Promise((resolve, reject) => {
    const proc = spawn("bash", [scriptPath, ...args]);

    proc.stdout.on("data", (data) => {
      io.emit(channel, data.toString());
    });

    proc.stderr.on("data", (data) => {
      io.emit(channel, data.toString());
    });

    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Script exited with code ${code}`));
    });
  });
}

module.exports = { runScript };
