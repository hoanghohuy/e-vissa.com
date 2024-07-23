class APIClient {
    constructor(baseURL = '', header = {}) {
        this.baseURL = baseURL;
        this.header = header;
    }

    async get(endpoint, params = {}) {
        Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
        const response = await fetch(`${this.baseURL}/${endpoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        return await this.responseApi(response);
    }

    async post(endpoint, data) {
        const response = await fetch(`${this.baseURL}/${endpoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return await this.responseApi(response);
    }

    async put(endpoint, data) {
        const response = await fetch(`${this.baseURL}/${endpoint}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        return await this.responseApi(response);
    }

    async delete(endpoint) {
        const response = await fetch(`${this.baseURL}/${endpoint}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });

        return await this.responseApi(response);
    }

    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
            ...this.header,
        };

        return headers;
    }

    async postUrlencoded(endpoint, data) {
        const formData = new URLSearchParams();
        Object.keys(data).forEach((key) => formData.append(key, data[key]));

        const response = await fetch(`${this.baseURL}/${endpoint}`, {
            method: 'POST',
            headers: this.getHeadersForUrlencoded(),
            body: formData,
        });
        return await this.responseApi(response);
    }

    getHeadersForUrlencoded() {
        return {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...this.header,
        };
    }

    async responseApi(response) {
        // Check content type
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            // Response is JSON
            return await response.json();
        } else {
            // Response is not JSON, handle it accordingly
            return await response.text();
        }
    }
}

module.exports = APIClient;
