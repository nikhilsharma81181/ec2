var ffmpeg = require("fluent-ffmpeg");
const { upload } = require("./file_upload");

const transcodeVideo = async (filename, filepath, formats) => {
  for (let i = 0; i < formats.length; i++) {
    ffmpeg(filepath)
      .videoCodec("libx264")
      .audioCodec("aac")
      .size(`?x${formats[i]}`)
      .on("err", function (err) {
        console.log(err);
      })
      .on("end", async function () {
        await upload(filename, formats);
      })
      .save(`./${filename}${formats[i]}.mp4`);
  }
};

exports.transcodeVideo = transcodeVideo;
