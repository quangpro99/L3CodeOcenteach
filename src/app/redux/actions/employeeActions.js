import { ActionTypes } from './actionType';

//action list employee
export const GetListEmployee = ({ type, RowsPerPage, pageSize }) => {
  return { type: ActionTypes.GET_LIST_EMPLOYEE, payload: { type, RowsPerPage, pageSize } };
};

export const getListEmployeeSuccess = ({ res }) => {
  return { type: ActionTypes.GET_LIST_EMPLOYEE_SUCCESS, payload: { res } };
};

export const getListEmployeeFailed = ({ errors }) => {
  return { type: ActionTypes.GET_LIST_EMPLOYEE_FAILED, payload: { errors } };
};

//action delete employee
export const deleteEmployee = ({ id }) => {
  return { type: ActionTypes.DELETE_EMPLOYEE, payload: { id } };
};

export const deleteEmployeeSuccess = ({ res }) => {
  return { type: ActionTypes.DELETE_EMPLOYEE_SUCCESS, payload: { res } };
};

export const deleteEmployeeFailed = ({ errors }) => {
  return { type: ActionTypes.DELETE_EMPLOYEE_FAILED, payload: { errors } };
};

//action data employee
export const GetDataEmployee = (object) => {
  return { type: ActionTypes.GET_EMPLOYEE_DATA, payload: object };
};

//action add employee
export const addEmployee = (object) => {
  return { type: ActionTypes.ADD_EMPLOYEE_DATA, payload: { object } };
};

export const addEmployeeSuccess = ({ res }) => {
  return { type: ActionTypes.ADD_EMPLOYEE_DATA_SUCCESS, payload: { res } };
};

export const addEmployeeFailed = ({ errors }) => {
  return { type: ActionTypes.ADD_EMPLOYEE_DATA_FAILED, payload: { errors } };
};

//action update cv
export const updateEmployee = (data) => {
  return { type: ActionTypes.UPDATE_EMPLOYEE_DATA, payload: data };
};

export const updateEmployeeSuccess = ({ res }) => {
  return { type: ActionTypes.UPDATE_EMPLOYEE_DATA_SUCCESS, payload: { res } };
};

export const updateEmployeeFailed = ({ errors }) => {
  return { type: ActionTypes.UPDATE_EMPLOYEE_DATA_FAILED, payload: { errors } };
};

export const getIdRegister = (id) => {
  return { type: ActionTypes.GET_ID_REGISTER, payload: id };
};

//action update employee
export const putEmployee = (data) => {
  return { type: ActionTypes.UPDATE_EMPLOYEE, payload: data };
};

export const putEmployeeSuccess = ({ res }) => {
  return { type: ActionTypes.UPDATE_EMPLOYEE_SUCCESS, payload: { res } };
};

export const putEmployeeFailed = ({ errors }) => {
  return { type: ActionTypes.UPDATE_EMPLOYEE_FAILED, payload: { errors } };
};

//action send leader
export const sendLead = ({ id, data }) => {
  return { type: ActionTypes.SEND_LEAD_DATA, payload: { id, data } };
};

export const sendLeadSuccess = ({ res }) => {
  return { type: ActionTypes.SEND_LEAD_DATA_SUCCESS, payload: { res } };
};

export const sendLeadFailed = ({ errors }) => {
  return { type: ActionTypes.SEND_LEAD_DATA_FAILED, payload: { errors } };
};

//action detail form
export const getDetail = (id) => {
  return { type: ActionTypes.GET_DETAIL, payload: id };
};

export const getDetailSuccess = ({ resGetForm, resGetEmployeeById }) => {
  return { type: ActionTypes.GET_DETAIL_SUCCESS, payload: { resGetForm, resGetEmployeeById } };
};

export const getDetailFailed = ({ errors }) => {
  return { type: ActionTypes.GET_DETAIL_FAILED, payload: { errors } };
};

//total employee count
export const totalEmployeeCount = (type) => {
  return { type: ActionTypes.TOTAL_EMPLOYEE_COUNT, payload: type };
};

export const totalEmployeeCountSuccess = ({ res }) => {
  return { type: ActionTypes.TOTAL_EMPLOYEE_COUNT_SUCCESS, payload: { res } };
};

export const totalEmployeeCountFailed = ({ errors }) => {
  return { type: ActionTypes.TOTAL_EMPLOYEE_COUNT_FAILED, payload: { errors } };
};
