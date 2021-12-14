const { spawn } = require("child_process");

let up = {
  144: "",
  240: "",
  360: "",
  480: "",
  720: "",
  1080: "",
  1440: "",
  2160: "",
  4320: "",
};

const upload = async (newName, formats) => {
  for (let i = 0; i < formats.length; i++) {
    up[formats[i]] = spawn("aws", [
      "s3",
      "cp",
      `${newName}${formats[i]}.mp4`,
      `s3://transcoded-video-test/${newName}${formats[i]}.mp4`,
    ]);
    console.log(up[formats[i]]);
    await up[formats[i]].stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });
    await up[formats[i]].stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });
    await up[formats[i]].on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }
};

exports.upload = upload;
