# Simple AI App

带 Web UI 界面的聊天机器人。仅用于人工智能应用开发学习，会逐步完善

## 环境

此代码库包含完整的前后端，为了避免引入复杂的环境配置，统一采用前端技术栈。

- Node.js >= v22.x

## 技术栈

- Express: SSE 服务端实现
- LangChain
- React: Vite、SSE 客户端实现

## 配置大模型服务

在项目根目录新建 .env 文件，添加以下内容以启用 LLM 服务：

```shell
API_KEY=sk-xxx           # 模型 API key
BASE_URL=https://xxx     # 模型服务接口
MODEL=model-name         # 模型名称
```

## 运行项目

```bash
npm install

# 同时启动前后端
npm run dev

# 或分别启动前后端
npm run dev:ui
npm run dev:server
```
