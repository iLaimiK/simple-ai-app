# Simple AI App

仅用于人工智能应用开发学习，会逐步完善

## 环境

此代码库包含完整的前后端，为了避免引入复杂的环境配置，统一采用前端技术栈。

- Node.js >= v22.x

```bash
pnpm install
```

## 模型服务和 API key 说明

在项目根目录新建 .env 文件，添加以下内容以启用模型服务：

```shell
API_KEY=sk-xxx           # 模型 API key
BASE_URL=https://xxx     # 模型服务接口
MODEL=model-name         # 模型名称
```
