import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const predictClaim = async (data) => {
    try {
        const response = await api.post('/predict', data);
        return response.data;
    } catch (error) {
        console.error('Error predicting claim:', error);
        throw error;
    }
};

export const getModelInfo = async () => {
    try {
        const response = await api.get('/model-info');
        return response.data;
    } catch (error) {
        console.error('Error fetching model info:', error);
        throw error;
    }
};

export default api;
