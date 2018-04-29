import Immutable from "immutable";

const initialState = Immutable.fromJS({
  name: 'Constituency name',
  population: 0
});

const reducers = {
  "CONSTITUENCY_CHANGED": (state, data) => state.mergeDeep(data),
}
export default (state=initialState, action) => {
  if(action.type in reducers) {
    return reducers[ action.type ](state, action.payload);
  }
  return state;
}
