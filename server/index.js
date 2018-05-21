import serverless from 'serverless-http';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
// Enable cors
app.use(cors());

axios.defaults.baseURL = 'https://api.giphy.com/v1';

const axiosConfig = {
  params: {
    api_key: '',
  }
};

app.get('/random', (request, response) => {
  const entries = [];
  const promises = [];
  const endpoint = '/gifs/random';

  for(let i = 0; i < 25; i++) {
    promises.push(axios.get(endpoint, axiosConfig))
  }
  
  axios.all(promises).then((data) => {
    data.map(prom => {
      entries.push(prom.data.data)
    })

    response.json(entries)
  });
})

app.get('/trending', (request, response) => {
  const endpoint = '/gifs/trending';

  axios.get(endpoint, axiosConfig).then(data => {
    response.json(data.data.data)
  });

});


export const handler = serverless(app);
