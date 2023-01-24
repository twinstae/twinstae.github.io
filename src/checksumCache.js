const checksum = require('checksum');
const fs = require('node:fs/promises');

const FileRepo = (filePath) => {
	return {
		async read(){
			return fs
				.readFile(filePath, {
					encoding: 'utf8',
				})
				.catch(() => null);
		},
		async write(text){
			return fs.writeFile(filePath, text, {
				encoding: 'utf8',
			});
		}
	}
}

module.exports = {
  checksumCache(afunc) {
    // afunc: (string) => Promise<string>
    return async function (arg) {
      // arg: string
      const cs = checksum(arg);
      const repo = FileRepo('./cache/' + cs);
      const cache = await repo.read();

      if (!cache) {
        console.log('cache not found! ' +cs)
        const result = await afunc(arg);
				await repo.write(result);
        return result;
      }
      console.log('cache found!' + cs)
      return cache;
    };
  },
};
