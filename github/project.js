const get_project = require('../spider/get_project');

const project = ({query, source, method}) => {
  switch(method.toUpperCase()) {
    case 'GET':
      return get_project(source);
  }
}

module.exports = project;