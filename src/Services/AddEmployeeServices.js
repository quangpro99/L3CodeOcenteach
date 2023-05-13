import { API_ENPOINT, TOKEN } from '~/app/appConfig';
import axios from 'axios';

const API_EMPLOYEE = API_ENPOINT + 'employees';

export const getTokenAPI = async () => {
  return await axios.post(
    'http://em-dev.oceantech.com.vn/em/oauth/token',
    {
      client_id: 'core_client',
      grant_type: 'password',
      client_secret: 'secret',
      username: 'admin',
      password: 'admin',
    },
    {
      headers: {
        Authorization: 'Basic Y29yZV9jbGllbnQ6c2VjcmV0',
      },
    },
  );
};

export const getListEmployee = async (type, RowsPerPage, pageSize) => {
  return await axios.get(API_EMPLOYEE + '?statuses=' + type + '&page=' + pageSize + '&size=' + RowsPerPage, {
    headers: {
      Authorization: TOKEN,
    },
  });
};

export const deleteEmployee = async (id) => {
  return await axios.put(
    API_EMPLOYEE + '/' + id + '/status',
    { status: 14 },
    {
      headers: {
        Authorization: TOKEN,
      },
    },
  );
};

export const addEmployee = async (object) => {
  return await axios.post(API_EMPLOYEE, object, {
    headers: {
      Authorization: TOKEN,
    },
  });
};

//save in form register
export const updateEmployee = async (object) => {
  return await axios.put(API_EMPLOYEE + '/' + object.employeeId + '/form', object, {
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json',
    },
  });
};

//save in form register
export const putEmployee = async (object) => {
  return await axios.put(API_EMPLOYEE + '/' + object.employeeId, object.data, {
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json',
    },
  });
};

//get form
export const getForm = async (id) => {
  return await axios.get(API_EMPLOYEE + '/' + id + '/form', {
    headers: {
      Authorization: TOKEN,
    },
  });
};

//get Employee by Id
export const getEmployeeById = async (id) => {
  return await axios.get(API_EMPLOYEE + '/' + id, {
    headers: {
      Authorization: TOKEN,
    },
  });
};

//send lead in form register
export const sendLead = async (id, object) => {
  return await axios.put(API_EMPLOYEE + '/' + id + '/status', object, {
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json',
    },
  });
};

//get total employee
export const totalEmployee = async (type) => {
  return await axios.get(API_EMPLOYEE + '/total?statuses=' + type, {
    headers: {
      Authorization: TOKEN,
    },
  });
};

//add promote
export const addPromote = async (id, object) => {
  return await axios.post(API_EMPLOYEE + '/' + id + '/promote?page=1&size=5', object, {
    headers: {
      Authorization: TOKEN,
    },
  });
};

//get promote
export const getListPromote = async (id) => {
  return await axios.get(API_EMPLOYEE + '/' + id + '/promote?page=1&size=5', {
    headers: {
      Authorization: TOKEN,
    },
  });
};

//delete promote
export const deletePromote = async (id) => {
  return await axios.delete(API_EMPLOYEE + '/promote/' + id, {
    headers: {
      Authorization: TOKEN,
    },
  });
};
