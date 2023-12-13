/*
 * @Date: 2023-12-11 22:23:58
 * @LastEditors: czzou
 * @LastEditTime: 2023-12-13 19:28:12
 * @FilePath: /opentelemetry/opentelemetry-js/guide/09.resources/instrumentation.ts
 */

import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
  resource: new Resource({
    [ SemanticResourceAttributes.SERVICE_NAME ]: "yourServiceName",
    [ SemanticResourceAttributes.SERVICE_NAMESPACE ]: "yourNameSpace",
    [ SemanticResourceAttributes.SERVICE_VERSION ]: "1.0",
    [ SemanticResourceAttributes.SERVICE_INSTANCE_ID ]: "my-instance-id-1",
  })
});

sdk.start();