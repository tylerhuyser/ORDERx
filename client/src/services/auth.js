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
  const userCategory = localStorage.getItem('userCategory')
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    api.defaults.headers.common['User-Category'] = `${userCategory}`
    const resp = await api.get('/auth/verify');
    console.log(resp.data)
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

export const createNewPatient = async (patientData) => {
  const resp = await api.post('/patients/', { patient: patientData })
  return resp.data.patient;
}

export const removeToken = () => {
  api.defaults.headers.common.authorization = null
}