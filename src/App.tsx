import type { ChatMessage } from '@/types';
import { useKeyPress, useReactive } from 'ahooks';
import { ArrowRightIcon, Loader2Icon, SquareIcon } from 'lucide-react';
import { useRef } from 'react';
import { MessageItem } from './components/MessageItem';
import { cn } from './lib/utils';

function App() {
  const state = useReactive({
    messages: [] as ChatMessage[],
    input: '',
    isConnecting: false,
    isReplying: false,
    error: ''
  });

  const input = useRef<HTMLInputElement>(null);
  const abortController = useRef<AbortController | null>(null);

  // 监听输入框的回车事件
  useKeyPress('Enter', handleSend, { target: input });

  // 发送消息
  async function handleSend() {
    if (state.isConnecting) return;

    // 正在回复时再次点击按钮则中断流
    if (state.isReplying) {
      abortController.current?.abort();
      return;
    }

    if (state.input.trim() === '') {
      input.current?.focus();
      return;
    }

    try {
      state.isConnecting = true;
      state.error = '';

      // TODO SSE
    } catch (error: any) {
      state.error = error.message;
    } finally {
      state.isReplying = false;
      state.isConnecting = false;
    }
  }

  const isWelcome = state.messages.length === 0;

  return (
  <main
    className={cn(
      'pb-28',
      isWelcome && 'flex h-screen flex-col justify-center'
      )}
  >
    {/* 标题 */}
    <section className="sticky left-0 top-0">
      <h1
        className="bg-background relative mx-auto p-4 text-3xl font-medium md:w-3xl"
      >
        {isWelcome ? '有什么需要帮忙的喵？' : 'Neko'}
      </h1>
    </section>

    {/* 聊天消息 */}
    <section className="mx-auto flex w-full flex-col justify-between px-4 pb-6 leading-relaxed md:w-3xl">
      <div className="flex flex-1 flex-col gap-4">
        {state.messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
      </div>

      {state.error && (
        <div className="mt-4 rounded bg-red-50 p-4 py-3 text-sm text-red-500">
          {state.error}
        </div>
      )}
    </section>

    {/* 底部输入框 */}
    <section className={cn(
      'bg-background w-full p-4 pt-0 md:w-3xl',
      isWelcome ? 'relative mx-auto' : 'fixed bottom-0 left-1/2 -translate-x-1/2'
    )}>
      <div className="relative flex flex-col gap-2 rounded-xl border-2 pb-10 bg-background focus-within:border-primary">
        <input
          ref={input}
          className="h-11 px-4 outline-none"
          autoFocus
          value={state.input}
          onChange={(e) => (state.input = e.target.value)}
          disabled={state.isConnecting || state.isReplying}
          placeholder="在这里输入喵~"
        />
        <div className={cn(
          'absolute bottom-2 right-2 flex-center rounded-full bg-black p-1.5 text-white cursor-pointer',
          state.isConnecting && 'pointer-events-none bg-neutral-500'
        )} onClick={handleSend}>
          {state.isConnecting && <Loader2Icon size={16} className="animate-spin" />}
          {state.isReplying && <SquareIcon size={16} />}
          {!state.isConnecting && !state.isReplying && <ArrowRightIcon size={16} className="rotate--90" />}
        </div>
      </div>
    </section>
  </main>
  );
}

export default App;
