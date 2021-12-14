const { spawn } = require("child_process");
const { vidRes } = require("./video_res");

const download = async (realKey, newKey) => {
  const ls = spawn("aws", [
    "s3",
    "cp",
    `s3://raw-video-test/${realKey}`,
    `${newKey}`,
  ]);

  ls.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
  let newName = newKey.split(".mp4");
  setTimeout(async () => {
    await vidRes(newName[0], `./${newKey}`);
  }, 10000);
};

exports.download = download;
