async function fetchData(url, method = 'GET', postData = null, additionalHeaders = {}) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            ...additionalHeaders, 
        };

        const options = {
            method: method,
            headers: headers,
        };

        if (postData) {
            options.body = typeof postData === 'string' ? postData : JSON.stringify(postData);
        }

        const response = await fetch('/api' + url, options);

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const text = await response.text();
        if (!text.trim()) {
            return {}; // Обрабатываем пустой ответ
        }

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('Ошибка парсинга JSON:', parseError);
            throw new Error('Некорректный JSON в ответе');
        }
    } catch (error) {
        console.error('Ошибка запроса:', error);
        throw error; // Пробрасываем ошибку для обработки вызывающим кодом
    }
}

export default fetchData;
