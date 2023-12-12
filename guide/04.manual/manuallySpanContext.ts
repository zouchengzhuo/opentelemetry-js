/*
 * @Date: 2023-12-12 23:41:49
 * @LastEditors: czzou
 * @LastEditTime: 2023-12-12 23:48:05
 * @FilePath: /opentelemetry/opentelemetry-js/guide/04.manual/manuallySpanContext.ts
 */
import { Span, trace, context } from '@opentelemetry/api';
import { BasicTracerProvider, BatchSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';

const provider = new BasicTracerProvider();

provider.addSpanProcessor(new BatchSpanProcessor(new ConsoleSpanExporter()));

provider.register();

const tracer = trace.getTracer('example-basic-tracer-node');


// 业务代码部分
const mainWork = () => {
    const parentSpan = tracer.startSpan('main');
  
    for (let i = 0; i < 3; i += 1) {
      doWork(parentSpan, i);
    }
  
    // Be sure to end the parent span!
    parentSpan.end();
  };
  
  const doWork = (parent: Span, i: number) => {
    // To create a child span, we need to mark the current (parent) span as the active span
    // in the context, then use the resulting context to create a child span.
    const ctx = trace.setSpan(
      context.active(),
      parent,
    );
    const span = tracer.startSpan(`doWork:${i}`, undefined, ctx);
  
    // simulate some random work.
    for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
      // empty
    }
  
    // Make sure to end this child span! If you don't,
    // it will continue to track work beyond 'doWork'!
    span.end();
  };
  

  mainWork();

  setTimeout(()=>{ console.log('wait for console exporter') }, 5000)