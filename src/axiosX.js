import axios from 'axios';

// Создаем экземпляр Axios с настройками по умолчанию
const ax = axios.create({
    baseURL: 'https://your-api-url.com', // Замените на ваш URL
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Этот заголовок должен быть настроен на сервере
    },
});

// Перехватчик запросов для добавления заголовков
ax.interceptors.request.use(
    config => {
        // Добавляем заголовки, если нужно
        config.headers['Authorization'] = `Bearer sexing78`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Перехватчик ответов для обработки ошибок
ax.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default ax;
