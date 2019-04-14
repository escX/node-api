const get_project_info = require('../spider/get_project_info');

const project_info = ({query, source, method}) => {
  if (method === 'GET') {
    return get_project_info(source);
  }
}

module.exports = project_info;