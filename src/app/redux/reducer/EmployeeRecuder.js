import { ActionTypes } from '../actions/actionType';

const initialState = {
  listEmployee: [],
  employeeData: {
    employeeInfo: {},
    certificates: [],
    familyRelations: [],
  },
  IDRegister: 0,
  loading: false,
  detailForm: {},
  detailEmployee: {},
  total: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_LIST_EMPLOYEE: {
      return { ...state, loading: true };
    }
    case ActionTypes.GET_LIST_EMPLOYEE_SUCCESS: {
      return { ...state, listEmployee: action.payload.res.data.data, loading: false };
    }
    case ActionTypes.GET_LIST_EMPLOYEE_FAILED: {
      return { ...state, listEmployee: action.payload.errors, loading: false };
    }

    case ActionTypes.DELETE_EMPLOYEE: {
      return { ...state, loading: true };
    }
    case ActionTypes.DELETE_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        loading: false,
        isTrigger: !state.isTrigger,
      };
    }
    case ActionTypes.DELETE_EMPLOYEE_FAILED: {
      return {
        ...state,
        loading: false,
        isTrigger: !state.isTrigger,
      };
    }

    case ActionTypes.GET_EMPLOYEE_DATA: {
      return { ...state, employeeData: action.payload, loading: false };
    }

    case ActionTypes.ADD_EMPLOYEE_DATA: {
      return { ...state, loading: true };
    }
    case ActionTypes.ADD_EMPLOYEE_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case ActionTypes.ADD_EMPLOYEE_DATA_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case ActionTypes.GET_ID_REGISTER: {
      return { ...state, IDRegister: action.payload, loading: false };
    }

    case ActionTypes.GET_DETAIL: {
      return { ...state, loading: true };
    }
    case ActionTypes.GET_DETAIL_SUCCESS: {
      return {
        ...state,
        detailForm: action.payload.resGetForm.data.data,
        detailEmployee: action.payload.resGetEmployeeById.data.data,
        loading: false,
      };
    }
    case ActionTypes.GET_DETAIL_FAILED: {
      return { ...state, listEmployee: action.payload.errors, loading: false };
    }

    case ActionTypes.TOTAL_EMPLOYEE_COUNT: {
      return { ...state, loading: true };
    }
    case ActionTypes.TOTAL_EMPLOYEE_COUNT_SUCCESS: {
      return { ...state, total: action.payload.res.data.data, loading: false };
    }
    case ActionTypes.TOTAL_EMPLOYEE_COUNT_FAILED: {
      return { ...state, total: action.payload.errors, loading: false };
    }

    default:
      return state;
  }
};
