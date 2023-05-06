import {
  getListEmployee,
  deleteEmployee,
  addEmployee,
  updateEmployee,
  sendLead,
  getForm,
  getEmployeeById,
  totalEmployee,
  putEmployee,
} from '~/Services/AddEmployeeServices';
import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  getListEmployeeFailed,
  getListEmployeeSuccess,
  deleteEmployeeSuccess,
  deleteEmployeeFailed,
  GetDataEmployee,
  addEmployeeFailed,
  getIdRegister,
  updateEmployeeFailed,
  sendLeadFailed,
  getDetailFailed,
  getDetailSuccess,
  totalEmployeeCountSuccess,
  totalEmployeeCountFailed,
  putEmployeeSuccess,
  putEmployeeFailed,
} from '../actions/employeeActions';

//list employee
function* getListEmployeeSaga(payload) {
  try {
    const res = yield call(
      getListEmployee,
      payload.payload.type,
      payload.payload.RowsPerPage,
      payload.payload.pageSize,
    );
    yield put(getListEmployeeSuccess({ res: res }));
  } catch (error) {
    yield put(getListEmployeeFailed({ errors: error }));
  }
}

//total employee
function* getTotalEmployeeSaga(payload) {
  try {
    const res = yield call(totalEmployee, payload.payload);
    yield put(totalEmployeeCountSuccess({ res: res }));
  } catch (error) {
    yield put(totalEmployeeCountFailed({ errors: error }));
  }
}

//data employee add, update
function* addEmployeeSaga({ payload }) {
  try {
    yield put(GetDataEmployee(payload.object));
    const res = yield call(addEmployee, payload.object);
    if (res.data.code === 200) {
      yield put(getIdRegister(res.data.data.employeeInfo.employeeId));
      yield getListEmployeeSaga();
      toast.success('Thêm nhân viên thành công');
    } else {
      toast.error('Thêm nhân viên lỗi');
    }
  } catch (error) {
    yield put(addEmployeeFailed({ errors: error }));
  }
}

//delete employee
function* deleteEmployeeSaga({ payload }) {
  try {
    const res = yield call(deleteEmployee, payload.id);
    if (res.data.code === 200) {
      yield put(deleteEmployeeSuccess({ res: res }));
      toast.success('Xóa nhân viên thành công');
    } else {
      toast.error('Xóa nhân viên thất bại');
    }
  } catch (error) {
    yield put(deleteEmployeeFailed({ errors: error }));
  }
}

//update cv
function* editEmployeeSaga(payload) {
  try {
    const res = yield call(updateEmployee, payload.payload);
    if (res.data.code === 200) {
      yield getListEmployeeSaga({ payload: { type: '1,3,4,6', RowsPerPage: 10, pageSize: 1 } });
      toast.success('Lưu nhân viên thành công');
    } else {
      toast.error('Lưu nhân viên lỗi');
    }
  } catch (error) {
    yield put(updateEmployeeFailed({ errors: error }));
  }
}

//update employee
function* putEmployeeSaga(payload) {
  try {
    const res = yield call(putEmployee, payload.payload);
    if (res.data.code === 200) {
      yield getListEmployeeSaga({ payload: { type: '1,3,4,6', RowsPerPage: 10, pageSize: 1 } });
      toast.success('Sửa nhân viên thành công');
    } else {
      toast.error('Sửa nhân viên lỗi');
    }
  } catch (error) {
    yield put(putEmployeeFailed({ errors: error }));
  }
}

//send leader
function* sendLeaderSaga({ payload }) {
  try {
    const res = yield call(sendLead, payload.id, payload.data);
    if (res.data.code === 200) {
      if (payload.data.status === 3 && payload.data.registerName) {
        yield getListEmployeeSaga({ payload: { type: '1,3,4,6', RowsPerPage: 10, pageSize: 1 } });
        toast.success('Đã gửi lãnh đạo ' + payload.data.registerName + 'nhân viên id: ' + payload.id);
      } else if (payload.data.status === 5 || payload.data.status === 10) {
        yield getListEmployeeSaga({ payload: { type: '2,3,8,16', RowsPerPage: 10, pageSize: 1 } });
        toast.success('Đã duyệt thành công nhân viên id: ' + payload.id);
      } else if (payload.data.status === 6 || payload.data.status === 11) {
        yield getListEmployeeSaga({ payload: { type: '2,3,8,16', RowsPerPage: 10, pageSize: 1 } });
        toast.success('Đã từ chối nhân viên id: ' + payload.id);
      } else if (payload.data.status === 8 && payload.data.terminateRequestDetail) {
        yield getListEmployeeSaga({ payload: { type: '5', RowsPerPage: 10, pageSize: 1 } });
        toast.success('Đã trình lãnh đạo đơn xin nghỉ việc');
      } else if (payload.data.status === 8 && !payload.data.terminateRequestDetail) {
        yield getListEmployeeSaga({ payload: { type: '5', RowsPerPage: 10, pageSize: 1 } });
        toast.success('Đã trình lãnh đạo kết thúc');
      } else {
        yield getListEmployeeSaga({ payload: { type: '2,3,8,16', RowsPerPage: 10, pageSize: 1 } });
        toast.success('Đã gửi yêu cầu bổ sung nhân viên id: ' + payload.id);
      }
    } else {
      if (payload.data.registerName) {
        toast.error('Không gửi được lãnh đạo');
      } else if (payload.data.status === 5 || payload.data.status === 10) {
        toast.error('Duyệt thất bại vì quá time chờ duyệt !!');
      } else if (payload.data.status === 6) {
        toast.error('Từ chối thất bại vì quá time chờ duyệt !!');
      } else if (payload.data.status === 8 && payload.data.terminateRequestDetail) {
        toast.error('Trình đơn xin nghỉ việc thất bại !!');
      } else {
        toast.error('Không thể gửi yêu cầu bổ sung nhân viên này !!');
      }
    }
  } catch (error) {
    yield put(sendLeadFailed({ errors: error }));
  }
}

//watch detail
function* getDetail(payload) {
  try {
    const resGetForm = yield call(getForm, payload.payload);
    const resGetEmployeeById = yield call(getEmployeeById, payload.payload);
    if (resGetForm.data.code === 200 && resGetEmployeeById.data.code === 200) {
      yield put(getDetailSuccess({ resGetForm: resGetForm, resGetEmployeeById: resGetEmployeeById }));
      yield put(getIdRegister(payload.payload));
    } else {
      toast.error('Không xem được thông tin');
    }
  } catch (error) {
    yield put(getDetailFailed({ errors: error }));
  }
}

export {
  getListEmployeeSaga,
  deleteEmployeeSaga,
  addEmployeeSaga,
  editEmployeeSaga,
  sendLeaderSaga,
  getDetail,
  getTotalEmployeeSaga,
  putEmployeeSaga,
};
