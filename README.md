# TicketBounty

TicketBounty 是一个基于 [Next.js](https://nextjs.org/) 的票据管理系统，支持创建、编辑、查看和删除票据。项目使用了现代前端技术栈，包括 TypeScript、Prisma、Tailwind CSS 等。

## 功能特性

- **票据管理**：支持创建、编辑、查看和删除票据。
- **状态管理**：票据支持多种状态（`OPEN`、`IN_PROGRESS`、`CLOSED`）。
- **主题切换**：支持浅色和深色主题。
- **响应式设计**：适配不同设备屏幕。

## 技术栈

- **前端框架**：Next.js
- **数据库**：PostgreSQL
- **ORM**：Prisma
- **样式**：Tailwind CSS
- **图标库**：Lucide React
- **表单验证**：Zod

## 环境要求

- Node.js >= 18
- PostgreSQL 数据库

## 安装步骤

1. 克隆项目到本地：

   ```bash
   git clone <repository-url>
   cd tickets
   ```

2. 安装依赖：

   ```bash
   npm install
   ```

3. 配置环境变量：
   在项目根目录创建 `.env` 文件，并添加以下内容：

   ```env
   DATABASE_URL=your_database_url
   DIRECT_URL=your_direct_database_url
   ```

4. 初始化数据库：

   ```bash
   npx prisma migrate dev
   ```

5. 运行种子脚本（可选）：
   ```bash
   npm run prisma-seed
   ```

## 启动项目

- 开发模式：

  ```bash
  npm run dev
  ```

- 生产模式：
  ```bash
  npm run build
  npm start
  ```

## 项目结构

```
src/
├── app/                # Next.js 页面和布局
├── components/         # 可复用的 UI 组件
├── features/           # 功能模块
├── lib/                # 工具函数和库
├── prisma/             # Prisma 配置和种子脚本
└── styles/             # 全局样式
```

## 脚本命令

- `npm run dev`：启动开发服务器。
- `npm run build`：构建生产环境代码。
- `npm start`：启动生产环境服务器。
- `npm run lint`：运行 ESLint 检查代码。
- `npm run lint-fix`：修复 ESLint 检查的问题。
- `npm run prisma-seed`：运行数据库种子脚本。
- `npm run prisma-studio`：启动 Prisma Studio。

## 贡献指南

欢迎对本项目进行贡献！请确保在提交 PR 前运行以下命令以检查代码质量：

```bash
npm run lint
npm run type
```

## 许可证

本项目采用 [MIT License](https://opensource.org/licenses/MIT) 许可证。
