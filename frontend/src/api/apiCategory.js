// src/api/categoryService.js
import axios from 'axios';
import { BASE_URL } from '../utils/config';

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};