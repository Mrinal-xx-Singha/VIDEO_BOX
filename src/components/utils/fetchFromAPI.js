"use server";

import axios from 'axios';

const BASE_URL = 'https://youtube-search-and-download.p.rapidapi.com';

export const fetchFromAPI = async (url) => {
  const options = {
    params: {
      maxResults: '50'
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY || process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    },
  };

  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};

