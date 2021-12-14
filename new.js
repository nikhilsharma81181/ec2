const { spawn } = require("child_process");
const ls = spawn("aws", [
  "s3",
  "cp",
  "s3://test-first-bucket-1221/005 Important Message.mp4",
  'a.mp4'
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
