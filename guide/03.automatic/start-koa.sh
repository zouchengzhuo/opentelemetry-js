# env OTEL_TRACES_EXPORTER=otlp OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=your-endpoint \
# node --require @opentelemetry/auto-instrumentations-node/register app-koa.js

export OTEL_TRACES_EXPORTER="otlp"
export OTEL_METRICS_EXPORTER="otlp"
export OTEL_EXPORTER_OTLP_ENDPOINT="your-endpoint"
export OTEL_NODE_RESOURCE_DETECTORS="env,host,os"
export OTEL_SERVICE_NAME="your-service-name"
export NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register"
node app-koa.js