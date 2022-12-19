const basicInfo = require('./basicInfo')
const servers = require('./servers')
const tags = require('./tags')
const paths = require('./paths/index')
const components = require('./components')

module.exports = {
  ...basicInfo,
  ...servers,
  ...tags,
  paths,
  components,
}
