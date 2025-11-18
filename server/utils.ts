import { ToolMessage, type AIMessageChunk, type BaseMessage, type ToolCall } from '@langchain/core/messages';
import type { DynamicStructuredTool } from '@langchain/core/tools';

/**
 * 判断模型返回消息是否为工具调用
 */
export const isToolCall = (mes?: BaseMessage): mes is AIMessageChunk & { tool_calls: ToolCall[] } => {
  return Boolean(mes && 'tool_calls' in mes && Array.isArray(mes.tool_calls) && mes.tool_calls.length);
};

/**
 * 执行工具调用
 */
export async function executeToolCalls(tools: DynamicStructuredTool[], toolCalls: ToolCall[]) {
  const execute = async (toolCall: ToolCall) => {
    const { id, name, args } = toolCall;

    for (const tool of tools) {
      if (tool.name === name) {
        // 找到后调用它
        const result = await tool.invoke(args);

        return new ToolMessage({
          name: name!,
          tool_call_id: id!,
          content: JSON.stringify(result)
        });
      }
    }

    // 没找到对应工具，返回错误信息
    return new ToolMessage({
      name: name!,
      tool_call_id: id!,
      content: `unknown tool call: ${name}`
    });
  };

  // 模型可能一次输出多个工具调用，这里并发调用
  return Promise.all(toolCalls.map(execute));
}
