/*dice.ts*/
import { Span, SpanOptions, SpanStatusCode, trace, context, propagation } from '@opentelemetry/api';
import { SemanticAttributes } from '@opentelemetry/semantic-conventions';

const tracer = trace.getTracer('dice-rpc-service');

export class MockRpcService {
  public mockRpcFunction(rolls: number, min: number, max: number, inputContext: Record<string, any>) {
    let activeContext = propagation.extract(context.active(), inputContext);
    console.log('========= inputContext =======', inputContext, activeContext);
    let span = tracer.startSpan(
      'mockRpcFunction',
      {
        attributes: {},
      },
      activeContext,
    );
    trace.setSpan(activeContext, span);
    // extract context
    return this._rollTheDice(rolls, min, max)
  }
  private _rollTheDice(rolls: number, min: number, max: number) {
    // Create a span. A span must be closed.
    return tracer.startActiveSpan('rollTheDice', (parentSpan: Span) => {
      const result: number[] = [];
      for (let i = 0; i < rolls; i++) {
        result.push(this._rollOnce(i, min, max));
      }
      // Be sure to end the span!
      parentSpan.end();
      return result;
    });
  }

  private _rollOnce(i: number, min: number, max: number) {
    const spanOptions:SpanOptions = {};
    // 可以在创建时设置 attributes
    spanOptions.attributes = { attribute1: 'value1' };
    // 可以在创建时设置links 关联到别的 span
    // spanOptions.links = [{ context: spanToLinkFrom.spanContext() }]
    return tracer.startActiveSpan(
        `rollOnce:${i}`,
        spanOptions,
        (span: Span) => {
        const result = Math.floor(Math.random() * (max - min) + min);
        span.setAttribute('dicelib.rolled', result.toString());
        span.setAttribute(SemanticAttributes.CODE_FUNCTION, 'rollOnce');
        span.setAttribute(SemanticAttributes.CODE_FILEPATH, __filename);
        span.addEvent('doing roll job');
        // if (result > 4) {
        //     span.recordException(new Error('err msg'));
        //     span.setStatus({
        //         code: SpanStatusCode.ERROR,
        //         message: 'Error',
        //       });
        // }
        span.end();
        return result;
        });
  }
}