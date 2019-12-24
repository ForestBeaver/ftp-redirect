const internalIp = require("internal-ip");
const { FtpSrv } = require("ftp-srv");
const VirtualFileSystem = require("./virtual_file_system");

const ip = internalIp.v4.sync();

const ftpServer = new FtpSrv({
  url: `ftp://${ip}:21`,
  pasv_url: ip,
  pasv_min: 50000,
  pasv_max: 60000,
  anonymous: true
});

ftpServer.on("login", ({ connection, context, error }, res, rej) => {
  return res({
    fs: new VirtualFileSystem()
  });
});

ftpServer.listen().then(() => {});
