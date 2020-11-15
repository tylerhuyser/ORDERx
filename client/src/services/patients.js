import api from './api-config'

export const getAllPatients = async (id) => {
  const resp = await api.get(`/doctors/${id}/patients`);
  return resp.data;
}

export const getOnePatient = async (id) => {
  const resp = await api.get(`/patients/${id}`);
  return resp.data;
}