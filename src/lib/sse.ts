export type SSEOptions = {
  params: Record<string, string>;
  signal: AbortSignal;
};

/**
 * 使用原生 EventSource 发送 GET 请求
 */
export async function sse<T>(path: string, options: SSEOptions) {
  const { params, signal } = options;

  const search = new URLSearchParams(params);
  const url = `${path}?${search}`;

  return new Promise<AsyncGenerator<T>>((resolve, reject) => {
    let resolvers: PromiseWithResolvers<T | null>;

    const generator = async function* () {
      while (true) {
        resolvers = Promise.withResolvers<T | null>();
        const result = await resolvers.promise;
        if (result === null) {
          break;
        }
        yield result;
      }
    };

    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      // 返回生成器，这样调用方就可以 for await
      resolve(generator());
    };

    eventSource.onerror = () => {
      reject(new Error('EventSource connection error'));
      // 防止浏览器自动重连
      eventSource.close();
    };

    eventSource.onmessage = (event) => {
      if (!event.data) return;
      try {
        resolvers?.resolve(JSON.parse(event.data));
      } catch (error) {
        resolvers?.reject(error);
      }
    };

    // 自定义 close 事件
    eventSource.addEventListener('close', () => {
      resolvers?.resolve(null);
    });

    signal.addEventListener('abort', () => {
      eventSource.close();
      resolvers?.reject(new Error('Aborted'));
    });
  });
}
