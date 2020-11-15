import api from './api-config'

export const getAllMedications = async () => {
  const resp = await api.get('/medications');
  return resp.data;
}

export const getOneMedication = async (id) => {
  const resp = await api.get(`/medications/${id}`);
  return resp.data;
}

export const postMedication = async (medicationData) => {
  const resp = await api.post(`/medications`, {medication: medicationData});
  return resp.data;
}

export const putMedication = async (id, medicationData) => {
  const resp = await api.post(`/medications/${id}`, {medication: medicationData});
  return resp.data;
}

export const destroyMedication = async (id) => {
  const resp = await api.delete(`/medications/${id}`);
  return resp;
}