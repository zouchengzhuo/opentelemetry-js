/*
 * @Date: 2023-12-12 22:37:56
 * @LastEditors: czzou
 * @LastEditTime: 2023-12-13 17:56:46
 * @FilePath: /opentelemetry/opentelemetry-js/guide/08.propagation/app.ts
 */
/*app.ts*/
import { trace, context, propagation, Span } from '@opentelemetry/api';
import express, { Request, Express } from 'express';
import { MockRpcService } from './dice';

const tracer = trace.getTracer('dice-server', '0.1.0');

const PORT: number = parseInt(process.env.PORT || '8080');
const app: Express = express();
const mockRpcProxy = new MockRpcService();

app.get('/rolldice', (req, res) => {
  const rolls = req.query.rolls ? parseInt(req.query.rolls.toString()) : NaN;
  if (isNaN(rolls)) {
    res
      .status(400)
      .send("Request parameter 'rolls' is missing or not a number.");
    return;
  }
  // 未使用自动注入时，可以手动生成 trace span
  // tracer.startActiveSpan('/rolldice router', (parentSpan: Span) => {
  //   const outputContext: Record<string, any> = {}
  //   propagation.inject(context.active(), outputContext);
  //   console.log('====== outputContext ======', outputContext)
  //   res.send(JSON.stringify(mockRpcProxy.mockRpcFunction(rolls, 1, 6, outputContext)));
  //   parentSpan.end();
  // });

  // 使用了自动注入，直接获取 active context 即可
  const outputContext: Record<string, any> = {}
  propagation.inject(context.active(), outputContext);
  console.log('====== outputContext ======', outputContext)
  res.send(JSON.stringify(mockRpcProxy.mockRpcFunction(rolls, 1, 6, outputContext)));

});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
