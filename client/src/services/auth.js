import api from './api-config';

export const loginDoctor = async (loginData) => {
  const resp = await api.post('/auth/doctor', { authentication: loginData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.doctor
}

export const registerDoctor = async (registerData) => {
  const resp = await api.post('/doctors/', { doctor: registerData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.doctor
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/auth/verify');
    return resp.data
  }
  return null
}

export const loginPatient = async (loginData) => {
  const resp = await api.post('/auth/patient', { authentication: loginData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.patient
}

export const registerPatient = async (registerData) => {
  const resp = await api.post('/patients/', { patient: registerData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.patient
}

// export const verifyPatient = async () => {
//   const token = localStorage.getItem('authToken');
//   if (token) {
//     api.defaults.headers.common.authorization = `Bearer ${token}`
//     const resp = await api.get('/auth/verify');
//     return resp.data
//   }
//   return null
// }

export const removeToken = () => {
  api.defaults.headers.common.authorization = null
}