/*
 * @Date: 2023-12-11 22:36:29
 * @LastEditors: czzou
 * @LastEditTime: 2023-12-11 22:36:37
 * @FilePath: /opentelemetry/opentelemetry-js/guide/02.start-web/document-load.ts
 */

// /* document-load.ts|js file - the code snippet is the same for both the languages */
// import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
// import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
// import { ZoneContextManager } from '@opentelemetry/context-zone';
// import { registerInstrumentations } from '@opentelemetry/instrumentation';

// const provider = new WebTracerProvider();

// provider.register({
//   // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
//   contextManager: new ZoneContextManager(),
// });

// // Registering instrumentations
// registerInstrumentations({
//   instrumentations: [new DocumentLoadInstrumentation()],
// });

/* document-load.ts|js file - the code is the same for both the languages */
import {
    ConsoleSpanExporter,
    SimpleSpanProcessor,
  } from '@opentelemetry/sdk-trace-base';
  import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
  import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
  import { ZoneContextManager } from '@opentelemetry/context-zone';
  import { registerInstrumentations } from '@opentelemetry/instrumentation';
  
  const provider = new WebTracerProvider();
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  
  provider.register({
    // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
    contextManager: new ZoneContextManager(),
  });
  
  // Registering instrumentations
  registerInstrumentations({
    instrumentations: [new DocumentLoadInstrumentation()],
  });