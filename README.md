# Fitness Tracker

一个个人使用的健身记录网页：移动端优先、简单密码保护、周一到周五训练计划、每组训练记录、历史记录和 JSON 导出。

## 本地开发

```bash
npm install
npm run dev
```

后端本地运行：

```bash
cp .env.example .env
npm run server
```

## 生产部署

```bash
cp .env.example .env
npm install
npm run build
npm start
```

`.env` 示例：

```bash
PORT=18081
APP_PASSWORD=your-password
SESSION_SECRET=your-random-secret
DATA_FILE=./data/fitness-records.json
```

## API

- `POST /api/login`：密码登录，返回 token。
- `GET /api/records`：读取训练记录，需要 token。
- `PUT /api/records/:date`：保存指定日期记录，需要 token。
- `GET /api/export`：导出 JSON，需要 token。
