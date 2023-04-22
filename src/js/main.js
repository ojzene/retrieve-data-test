"use strict";
async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const result = data.data.items;
        return result;
    } catch (error) {
        const { message } = error;
        return { message };
    }
}

module.exports = fetchData;
