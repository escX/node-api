const cheerio = require('cheerio');
const superagent = require('superagent');

const info = {
  describe: '',
  homepage: '',
  examplepage: ''
};

const setInfo = (key, value) => {
  info[key] = value;
}

const requestHome = homeUrl => {
  return new Promise((resolve, reject) => {
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
};

const requestExample = exampleUrl => {
  return new Promise((resolve, reject) => {
    superagent.get(exampleUrl).end(err => {
      if (err) {
        reject();
        return false;
      }

      setInfo('examplepage', exampleUrl);

      resolve();
    });
  });
};

module.exports = projectName => {
  const homeUrl = `https://github.com/escX/${projectName}`;
  const exampleUrl = `https://escx.github.io/${projectName}`;

  const promiseHome = requestHome(homeUrl);
  const promiseExample = requestExample(exampleUrl);

  return new Promise(resolve => {
    Promise.all([promiseHome, promiseExample]).finally(() => {
      resolve(info);
    });
  });
};