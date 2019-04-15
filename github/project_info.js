const get_project_info = require('../spider/get_project_info');

const project_info = ({query, source, method}) => {
  switch(method.toUpperCase()) {
    case 'GET':
      return get_project_info(source);
  }
}

module.exports = project_info;