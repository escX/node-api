const cheerio = require('cheerio');
const superagent = require('superagent');

const requestHome = homeUrl => {
  return new Promise((resolve, reject) => {
    superagent.get(homeUrl).end((err, res) => {
      if (err) {
        reject({
          code: 404,
          error: '项目不存在'
        });
        return false;
      }

      let describe = '';

      try {
        const $ = cheerio.load(res.text);
        describe = $('[itemprop="about"]').text().trim();
      } catch (ex) {}

      resolve({
        home: homeUrl,
        describe
      });
    });
  });
};

const requestExample = exampleUrl => {
  return new Promise((resolve, reject) => {
    superagent.get(exampleUrl).end(err => {
      let example = exampleUrl;

      if (err) {
        example = '';
      }

      resolve({example});
    });
  });
};

module.exports = projectName => {
  if (projectName === '' || projectName === undefined) {
    return Promise.reject({
      code: 404,
      error: '项目不存在'
    });
  }

  const homeUrl = `https://github.com/escX/${projectName}`;
  const exampleUrl = `https://escx.github.io/${projectName}`;

  const promiseHome = requestHome(homeUrl);
  const promiseExample = requestExample(exampleUrl);

  return new Promise((resolve, reject) => {
    Promise.all([promiseHome, promiseExample]).then(info => {
      resolve(Object.assign({}, ...info));
    }).catch(({code, error}) => {
      reject({code, error});
    });
  });
};