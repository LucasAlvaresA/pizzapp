import axios from 'axios';

const api = axios.create({
  // Run the Pizzapp Backend project first, then put your IP
  baseURL: 'http://yourIP:3333',
});

export {api};
