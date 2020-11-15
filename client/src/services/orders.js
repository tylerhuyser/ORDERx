import api from './api-config'

export const getAllOrders = async () => {
  const resp = await api.get('/orders');
  return resp.data;
}

export const getOneOrder = async (id) => {
  const resp = await api.get(`/orders/${id}`);
  return resp.data;
}

export const postOrder = async (orderData) => {
  const resp = await api.post(`/orders`, {order: orderData});
  return resp.data;
}

export const putOrder = async (id, orderData) => {
  const resp = await api.post(`/orders/${id}`, {order: orderData});
  return resp.data;
}

export const destroyOrder = async (id) => {
  const resp = await api.delete(`/orders/${id}`);
  return resp;
}