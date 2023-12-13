/*
 * @Date: 2023-12-11 22:21:48
 * @LastEditors: czzou
 * @LastEditTime: 2023-12-11 22:30:33
 * @FilePath: /opentelemetry/opentelemetry-js/guide/01.start-nodejs/app.ts
 */
import './instrumentation'
import express, { Express } from 'express';

const PORT: number = parseInt(process.env.PORT || '8080');
const app: Express = express();

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get('/rolldice', (req, res) => {
  res.send(getRandomNumber(1, 6).toString());
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});