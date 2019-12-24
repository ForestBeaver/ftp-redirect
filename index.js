const { FtpSrv } = require("ftp-srv");
const VirtualFileSystem = require("./virtual_file_system");

const ftpServer = new FtpSrv({
  url: "ftp://0.0.0.0:21",
  pasv_url: "192.168.1.11",
  anonymous: true
});

ftpServer.on("login", ({ connection, context, error }, res, rej) => {
  return res({
    fs: new VirtualFileSystem()
  });
});

ftpServer.listen().then(() => {});
