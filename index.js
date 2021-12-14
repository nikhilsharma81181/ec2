const AWS = require("aws-sdk");
const { download } = require("./file_download");

AWS.config.update({ region: "ap-south-1" });
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

let readUserDetails = async () => {
  var param = {
    QueueUrl: "https://sqs.ap-south-1.amazonaws.com/986900896984/TestSQS",
  };
  sqs.receiveMessage(param, async (err, data) => {
    if (err) {
      console.log("error", err);
    } else if (data.Messages) {
      data.Messages.forEach((msg) => {
        let newMsg = JSON.parse(msg.Body);
        let key = newMsg.Records[0]["s3"]["object"]["key"];
        let reqId = newMsg.Records[0]["responseElements"]["x-amz-request-id"];
        let preKey = key.split(".");
        let latkey = preKey.at(-1);
        let newKey = `vid${reqId}.${latkey}`;
        let realKey = key.split("+").join(" ");
        console.log(key);
        console.log(realKey);
        console.log(newKey);
        let transcode = async () => {
          await download(realKey, newKey);
         
          // await vidRes(
          //   "vidNS465YCTG5WNBXVZ1080.mp4",
          //   "./vidNS465YCTG5WNBXVZ1080.mp4"
          // );
        };
        transcode();
      });
    }
  });
};

readUserDetails();
