import axios from 'axios';
import { configure } from '../config/configure';

export const client = axios.create({
    baseURL: configure.BASE_URL
});
