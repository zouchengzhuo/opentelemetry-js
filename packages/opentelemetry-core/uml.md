# parse ts to uml

```mermaid

classDiagram
class ExportResult {
            <<interface>>
            +code: ExportResultCode
+error?: Error
            
        }
class ExportResultCode {
        <<enumeration>>
        SUCCESS
FAILED
      }
class ParsedBaggageKeyValue {
            <<type>>
            +key: string
+value: string
+metadata: any
            
        }
class AnchoredClock{
            +_monotonicClock: Clock
+_epochMillis: number
+_performanceMillis: number
            #now() number
        }
class Clock {
            <<interface>>
            
            +now() number
        }
Clock<|..AnchoredClock
class TimeOriginLegacy {
            <<interface>>
            +timing: { fetchStart: number; }
            
        }
class ShimWrapped {
            <<interface>>
            +__wrapped: boolean
+__unwrap: Function
+__original: Function
            
        }
class InstrumentationLibrary {
            <<interface>>
            +name: string*
+version?: string*
+schemaUrl?: string*
            
        }
class InstrumentationScope {
            <<interface>>
            +name: string*
+version?: string*
+schemaUrl?: string*
            
        }
Function<|..ShimWrapped
Function<|..ShimWrapped
Function<|..ShimWrapped
class Exporter~T~ {
            <<interface>>
            
            +export() void
        }
class CompositePropagator{
            +_propagators: TextMapPropagator[]*
+_fields: string[]*
            +inject() void
+extract() Context
+fields() string[]
        }
class CompositePropagatorConfig {
            <<interface>>
            +propagators?: TextMapPropagator[]
            
        }
TextMapPropagator<|..CompositePropagator
class IdGenerator {
            <<interface>>
            
            +generateTraceId() string
+generateSpanId() string
        }
class RPCType {
        <<enumeration>>
        HTTP
      }
class HTTPMetadata {
            <<type>>
            +type: RPCType
+route?: string
+span: Span
            
        }
class TraceState{
            +_internalState: Map~string, string~
            +set() TraceState
+unset() TraceState
+get() string | undefined
+serialize() string
+_parse() void
+_keys() string[]
+_clone() TraceState
        }
TraceState<|..TraceState
class W3CTraceContextPropagator{
            
            +inject() void
+extract() Context
+fields() string[]
        }
TextMapPropagator<|..W3CTraceContextPropagator
class BindOnceFuture~R,This,T~{
            +_isCalled: boolean
+_deferred: Deferred~R~
+_callback: T
+_that: This
            +call() Promise~R~
        }
class RAW_ENVIRONMENT {
            <<type>>
            
            
        }
class ObjectInto {
            <<interface>>
            +obj: any
+key: string
            
        }
class Deferred~T~{
            +_promise: Promise~T~
+_resolve: (val: T) =~ void
+_reject: (error: unknown) =~ void
            +resolve() void
+reject() void
        }
class TracesSamplerValues {
        <<enumeration>>
        AlwaysOff
AlwaysOn
ParentBasedAlwaysOff
ParentBasedAlwaysOn
ParentBasedTraceIdRatio
TraceIdRatio
      }
class TimeoutError{
            
            
        }
class W3CBaggagePropagator{
            
            +inject() void
+extract() Context
+fields() string[]
        }
TextMapPropagator<|..W3CBaggagePropagator
class RandomIdGenerator{
            +generateTraceId: () =~ string
+generateSpanId: () =~ string
            
        }
IdGenerator<|..RandomIdGenerator
class RandomIdGenerator{
            +generateTraceId: () =~ string
+generateSpanId: () =~ string
            
        }
IdGenerator<|..RandomIdGenerator
class AlwaysOffSampler{
            
            +shouldSample() SamplingResult
+toString() string
        }
Sampler<|..AlwaysOffSampler
class AlwaysOnSampler{
            
            +shouldSample() SamplingResult
+toString() string
        }
Sampler<|..AlwaysOnSampler
class ParentBasedSampler{
            +_root: Sampler
+_remoteParentSampled: Sampler
+_remoteParentNotSampled: Sampler
+_localParentSampled: Sampler
+_localParentNotSampled: Sampler
            +shouldSample() SamplingResult
+toString() string
        }
class ParentBasedSamplerConfig {
            <<interface>>
            +root: Sampler
+remoteParentSampled?: any
+remoteParentNotSampled?: any
+localParentSampled?: any
+localParentNotSampled?: any
            
        }
Sampler<|..ParentBasedSampler
class TraceIdRatioBasedSampler{
            +_upperBound: number
+_ratio: number*
            +shouldSample() SamplingResult
+toString() string
+_normalize() number
+_accumulate() number
        }
Sampler<|..TraceIdRatioBasedSampler
``````