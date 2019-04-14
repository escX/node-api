const url = require('url');
const apiDir = ['github'];

const dispatch = ({reqUrl, reqMethod}) => {
  return new Promise((resolve, reject) => {
    const parseUrl = url.parse(reqUrl, true);
    const [pathname, query] = [parseUrl.pathname, parseUrl.query];

    try {
      const pathArray = pathname.split('/');
      const dir = pathArray[1];
      const file = pathArray[2];
      const source = pathArray[3];
      if (apiDir.includes(dir)) {
        require(`./${dir}/${file}`)({
          query,
          source,
          method: reqMethod
        }).then(info => {
          resolve(info);
        }).catch(() => {
          reject();
        });
      } else {
        reject();
      }
    } catch (err) {
      reject();
    }
  });
};

const handle_request = request => {
  return new Promise((resolve, reject) => {
    const [reqUrl, reqMethod] = [request.url, request.method];
    dispatch({reqUrl, reqMethod}).then(info => {
      resolve(info);
    }).catch(() => {
      reject();
    });
  });
};

module.exports = handle_request;