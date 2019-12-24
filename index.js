const { FtpSrv } = require("ftp-srv");
const VirtualFileSystem = require("./virtual_file_system");

const ftpServer = new FtpSrv({
  url: "ftp://192.168.1.11:21",
  pasv_url: "192.168.1.11",
  pasv_min: 1024,
  pasv_max: 2048,
  anonymous: true
});

ftpServer.on("login", ({ connection, context, error }, res, rej) => {
  return res({
    fs: new VirtualFileSystem()
  });
});

ftpServer.listen().then(() => {});
