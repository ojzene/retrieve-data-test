"use strict";

const fetch = require("node-fetch");

const fetchAPI = async (apiUrl="") => {
    try {
        // checking if url is empty
        if (apiUrl !== '' || apiUrl.length !== 0) {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const result = data;
            return result;
        } 
        // when the url provided is empty
        throw Error("Please provide url!");
    } catch (error) {
        // when an error occur
        const { message } = error;
        return { message };
    }
}

module.exports = fetchAPI;
