// src/services/workService.js

import axios from 'axios';

const API_URL = '/work';

export const getAllWorks = () => {
  return axios.get(API_URL);
};

export const getWorkById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createWork = (workData) => {
  return axios.post(API_URL, workData);
};

export const updateWork = (id, workData) => {
  return axios.put(`${API_URL}/${id}`, workData);
};

export const deleteWork = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
