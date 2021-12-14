var ffmpeg = require("fluent-ffmpeg");
const { transcodeVideo } = require("./transcode");

// ffmpeg.setFfprobePath(pathToFfprobeExecutable);
let height = 0;
const resolutions = [144, 240, 360, 480, 720, 1080, 1440, 2160, 4320];
let formats = [];

const vidRes = async (name, path) =>
  ffmpeg.ffprobe(path, async function (err, metadata) {
    if (err) {
      console.error(err);
    } else {
      // metadata should contain 'width', 'height' and 'display_aspect_ratio'
      height = metadata.streams[0].height;
      for (let i = 0; i < resolutions.length; i++) {
        if (height >= resolutions[i]) {
          let res = resolutions[i];
          formats.push(res);
          console.log(formats);
        }
      }
      await transcodeVideo(name, path, formats);
    }
  });

exports.vidRes = vidRes;
