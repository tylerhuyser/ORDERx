import api from './api-config'

export const getAllPatients = async (doctorID) => {
  const resp = await api.get(`/doctors/${doctorID}/patients`);
  return resp.data;
}

export const getOnePatient = async (patientID) => {
  const resp = await api.get(`/patients/${patientID}`);
  return resp.data;
}

export const getAllDoctors = async (patientID) => {
  const resp = await api.get(`/patients/${patientID}/doctors`);
  return resp.data;
}

export const getOneDoctor = async (doctorID) => {
  const resp = await api.get(`/doctors/${doctorID}`);
  return resp.data;
}