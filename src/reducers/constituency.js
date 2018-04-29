import Immutable from "immutable";

const initialState = Immutable.fromJS({
  name: 'Constituency name',
  population: 0,
  selected: null
});

const reducers = {
  "CONSTITUENCY_CHANGED": (state, data) => state.mergeDeep(data),
  "CONSTITUENCY_SELECTED": (state, { selected }) => state.mergeDeep({ selected }),
}
export default (state=initialState, action) => {
  if(action.type in reducers) {
    return reducers[ action.type ](state, action.payload);
  }
  return state;
}
