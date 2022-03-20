import { IDrivers } from "../utils/Interfaces";

interface SetDataAction {
  type: "setFilteredData";
  payload?: any;
}
interface GetDataAction {
  type: "getFilteredData";
}
const initialState: IDrivers[] = [];
type Action = SetDataAction | GetDataAction;
const DriverDataReducer = (state = initialState, action: Action) => {
  console.log(action);
  switch (action.type) {
    case "setFilteredData":
      return action.payload;
    case "getFilteredData":
      return state;
    default:
      return state;
  }
};
export default DriverDataReducer;
