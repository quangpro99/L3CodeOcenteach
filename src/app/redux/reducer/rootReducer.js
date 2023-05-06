import { combineReducers } from 'redux';
import EmployeeRecuder from './EmployeeRecuder';

export default combineReducers({
  employee: EmployeeRecuder,
});
