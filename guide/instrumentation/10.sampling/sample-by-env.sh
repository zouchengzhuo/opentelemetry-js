export OTEL_TRACES_SAMPLER="traceidratio"
export OTEL_TRACES_SAMPLER_ARG="0.3"
ts-node -r "./instrumentation.ts" app.ts