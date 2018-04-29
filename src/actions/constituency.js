import _ from 'lodash';

export const setConstituency = ({ properties }) => ({
  type: "CONSTITUENCY_CHANGED",
  payload: _.extend(properties, {
    name: _.get(properties, 'AC_NAME')
  })
});
