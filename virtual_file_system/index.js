const { FileSystem } = require("ftp-srv");
const errors = require("ftp-srv/src/errors");
const Readable = require("stream").Readable;
const Stats = require("stats-ctor");
const fs = require("fs");

class VirtualFileSystem extends FileSystem {
  constructor() {
    super(...arguments);
    this.cwd = "/";
  }

  currentDirectory() {
    return this.cwd;
  }

  async get(fileName) {
    const stat = new Stats({
      mode: fs.constants.S_IFREG | (0o002 ^ 0o777),
      size: this.constructor.createRedirect(fileName).length,
      uid: 0,
      gid: 0
    });
    stat.name = fileName;
    return stat;
  }

  async chdir(path = ".") {
    if (path !== "/") {
      throw new errors.FileSystemError("Not a valid directory");
    }
    return path;
  }

  async list(path = ".") {
    // const stat = new Stats({
    //     mode: fs.constants.S_IFREG | (0o002 ^ 0o777),
    //     size: 0,
    //     uid: 0,
    //     gid: 0
    // });
    //
    // stat.name = "";

    return [];
  }

  async read(fileName, { start }) {
    const stream = new Readable();
    stream.push(this.constructor.createRedirect(fileName));
    stream.push(null);
    return stream;
  }

  static createRedirect(fileName) {
    // use the requested file name as the redirect target
    const url = fileName.slice(1);

    return `<!DOCTYPE html>
          <html lang="en">
            <head>
              <title>${url}</title>
            </head>
          
              <script>window.location.replace('${url}');</script>
          </html>`;
  }

  // don't allow any attempt to mutate the file system.
  async mkdir(path) {}

  async write(fileName, { append, start }) {}

  async delete(path) {}

  async rename(from, to) {}

  async chmod(path, mode) {}
}

module.exports = VirtualFileSystem;
