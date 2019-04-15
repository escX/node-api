const url = require('url');
const apiDir = ['github'];

const dispatch = ({reqUrl, reqMethod}) => {
  return new Promise((resolve, reject) => {
    const parseUrl = url.parse(reqUrl, true);
    const [pathname, query] = [parseUrl.pathname, parseUrl.query];

    const pathArray = pathname.split('/');
    const dir = pathArray[1];
    const file = pathArray[2];
    const source = pathArray[3];

    if (!apiDir.includes(dir)) {
      reject({
        code: 403,
        error: '没有访问权限'
      });
      return false;
    }

    try {
      const api = require(`./${dir}/${file}`);
      api({
        query,
        source,
        method: reqMethod
      }).then(info => {
        resolve(info);
      }).catch(({code, error}) => {
        reject({code, error});
      });
    } catch (ex) {
      reject({
        code: 404,
        error: '接口不存在'
      });
    }
  });
};

const handle_request = request => {
  return new Promise((resolve, reject) => {
    const [reqUrl, reqMethod] = [request.url, request.method];
    dispatch({reqUrl, reqMethod}).then(info => {
      resolve(info);
    }).catch(({code, error}) => {
      reject({code, error});
    });
  });
};

module.exports = handle_request;