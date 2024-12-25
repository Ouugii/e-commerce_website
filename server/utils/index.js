const _ = require("lodash");

const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

const omitInfoData = ({ fields = [], object = {} }) => {
  return _.omit(object, fields);
};

module.exports = {
  getInfoData,
  omitInfoData,
};
