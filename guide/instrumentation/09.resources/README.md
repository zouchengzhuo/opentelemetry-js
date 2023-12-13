
用来描述上报实体的对象。    
社区可能会实现各种 detector 来自动检测某些领域的 Resource 属性。  

```
Operating System
Host
Process and Process Runtime
Container
Kubernetes
Cloud-Provider-Specific Attributes
and more
```

```typescript
// 探测运行的容器平台信息，可以传入多个运营平台提供的 detector，命中则会返回需要的信息，没命中的也不影响
let resource = detectResourcesSync({
    detectors: [
        tkexBG1Detector,
        tkexBG1Detector,
        tkexBG3Detector,
    ],
});

resource = resource.merge(new Resource({
    // 可参考 @tencent/opentelemetry-semantic-conventions-tps
    // 或者设置自己的 semantic 模块中的属性
    [TpsResourceAttributes.TPS_TENANT_ID]: tenant_id,
    [TpsResourceAttributes.APP_ID]: config.load('server')?.['app'] || '',
    [TpsResourceAttributes.SERVER_ID]: config.load('server')?.['server'] || '',
    [SemanticResourceAttributes.SERVICE_NAME]: config.load('server')?.['server'] || '',
}));
```