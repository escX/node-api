const cheerio = require('cheerio');
const superagent = require('superagent');

const projectName = 'color-palette-picker';
const homeUrl = `https://github.com/escX/${projectName}`;
const exampleUrl = `https://escx.github.io/${projectName}`;
const info = {
  describe: '',
  homepage: '',
  examplepage: ''
};

const setInfo = (key, value) => {
  info[key] = value;
}

const requestHome = new Promise((resolve, reject) => {
  superagent.get(homeUrl).end((err, res) => {
    if (err) {
      reject();
      return false;
    }

    setInfo('homepage', homeUrl);

    try {
      const $ = cheerio.load(res.text);
      setInfo('describe', $('[itemprop="about"]').text().trim());
    } catch (error) {
      reject();
    }

    resolve();
  });
});

const requestExample = new Promise((resolve, reject) => {
  superagent.get(exampleUrl).end(err => {
    if (err) {
      reject();
      return false;
    }

    setInfo('examplepage', exampleUrl);

    resolve();
  });
});

module.exports = new Promise(resolve => {
  Promise.all([requestHome, requestExample]).finally(() => {
    resolve(info);
  });
});