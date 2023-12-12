/*
 * @Date: 2023-12-11 22:23:58
 * @LastEditors: czzou
 * @LastEditTime: 2023-12-12 01:10:07
 * @FilePath: /opentelemetry/opentelemetry-js/guide-instrumentation/01.start-nodejs/instrumentation.ts
 */
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();