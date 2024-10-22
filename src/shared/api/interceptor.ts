import { getContextType } from '@/shared/api/helper';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env['NEXT_PUBLIC_BACKEND_URL '],
  headers: getContextType(),
});
