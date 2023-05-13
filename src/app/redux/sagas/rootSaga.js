import { ActionTypes } from '../actions/actionType';
import { takeLatest } from 'redux-saga/effects';
import {
  getListEmployeeSaga,
  deleteEmployeeSaga,
  addEmployeeSaga,
  editEmployeeSaga,
  sendLeaderSaga,
  getDetail,
  getTotalEmployeeSaga,
  putEmployeeSaga,
  addPromoteSaga,
  getListPromoteSaga,
  deletePromoteSaga
} from './EmployeeSaga';

export default function* rootSaga() {
  yield takeLatest(ActionTypes.GET_LIST_EMPLOYEE, getListEmployeeSaga);
  yield takeLatest(ActionTypes.DELETE_EMPLOYEE, deleteEmployeeSaga);
  yield takeLatest(ActionTypes.ADD_EMPLOYEE_DATA, addEmployeeSaga);
  yield takeLatest(ActionTypes.UPDATE_EMPLOYEE_DATA, editEmployeeSaga);
  yield takeLatest(ActionTypes.SEND_LEAD_DATA, sendLeaderSaga);
  yield takeLatest(ActionTypes.GET_DETAIL, getDetail);
  yield takeLatest(ActionTypes.TOTAL_EMPLOYEE_COUNT, getTotalEmployeeSaga);
  yield takeLatest(ActionTypes.UPDATE_EMPLOYEE, putEmployeeSaga);
  yield takeLatest(ActionTypes.ADD_PROMOTE, addPromoteSaga);
  yield takeLatest(ActionTypes.GET_LIST_PROMOTE, getListPromoteSaga);
  yield takeLatest(ActionTypes.DELETE_PROMOTE, deletePromoteSaga)
}
