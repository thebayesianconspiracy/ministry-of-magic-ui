import _ from 'lodash';
import store from '../store';

export const setConstituency = ({ properties }) => ({
  type: "CONSTITUENCY_CHANGED",
  payload: _.extend(properties, {
    name: _.get(properties, 'AC_NAME')
  })
});

export const selectConstituency = (constituency) => ({
  type: "CONSTITUENCY_SELECTED",
  payload: {
    selected: constituency
  }
})

window.selectSomething = (name) => store.dispatch(selectConstituency(name))
