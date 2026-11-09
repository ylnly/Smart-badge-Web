# 次元星徽 DIMENSION STAR · 官网展示页

> **线上地址：<https://ylnly.github.io/Smart-badge-Web/>**
> 发给别人看用这个，公网可访问，手机也能打开。

[Smart-badge](https://github.com/ylnly/Smart-badge) 的产品展示页，纯静态、可离线运行。品牌 **麦谷 My Goo**，演示角色 **爱莉希雅 / ELYSIA**。

技术路线：**本地 ASR（FunASR Paraformer）+ 云端 LLM + 本地 TTS（CosyVoice 3.0）**，推理跑在 Windows + RTX 5070，终端为 ESP32-S3-Touch-LCD-1.85B。

## 三种打开方式

| 方式 | 地址 | 谁能看 |
|---|---|---|
| **线上（推荐）** | <https://ylnly.github.io/Smart-badge-Web/> | 所有人，发链接即可 |
| 本机预览 | <http://127.0.0.1:8080/> | **只有自己这台电脑**，需先启动本地服务器 |
| 直接开文件 | 双击 `index.html` | 只有自己，不需要 Node |

> `127.0.0.1` 是回环地址，永远指向「当前这台电脑」。别人点它等于在自己电脑上找 8080 端口，打不开 —— 分享请用上面的线上地址。

## 本机预览（可选，仅开发者用）

本机已装 Node，直接运行，无需安装任何依赖：

```powershell
node serve.mjs
```

浏览器打开 <http://127.0.0.1:8080/>。端口被占用时换一个：`node serve.mjs 8081`。

`serve.mjs` 是零依赖静态服务器，提供正确的 MIME 类型（`.png`、`.jpg`、`.css`、`.js` 等）、路径穿越防护与 `no-store` 缓存策略。

不想开服务器也可以双击 `index.html` —— 页面只依赖相对路径的本地资源，没有构建步骤。

## 页面结构

深色游戏官网风格的滚动叙事，五个章节：

| 章节 | 内容 |
|---|---|
| Hero | 品牌主视觉、爱莉希雅立绘、产品定位与核心卖点 |
| 角色 | 角色卡机制：人设、语气、记忆边界，随徽章一起佩戴 |
| 屏幕界面 | 1.85″ 圆形屏（360×360）的真实 UI 设计稿 |
| 语音系统 | ASR → LLM → TTS → 播放全链路，对白示例与分段延迟 |
| 硬件规格 / 路线 | 规格双表（当前验证平台 / 量产品目标）与迭代计划 |

页面文案支持中英切换（导航栏 EN 按钮），切换不刷新、不重新加载资源。

## 部署

站点是纯静态文件，仓库根目录即站点根：

- **GitHub Pages**（当前使用）：Settings → Pages → `main` 分支根目录。已配置完成，推送到 `main` 会自动重建。
- **任意静态托管**：把根目录文件原样上传（Nginx、Vercel、Cloudflare Pages、对象存储均可）。
- 资源引用为相对路径（`assets/...`），因此也支持部署在子目录下，无需改配置。

## 目录结构

```text
Smart-badge-Web/
├── index.html                    单文件页面（HTML + CSS + JS，无构建）
├── serve.mjs                     零依赖本地静态服务器（仅本机预览用）
└── assets/
    ├── mascot.png                角色立绘 爱莉希雅（Q 版，透明底）
    ├── product-front-clean.png   产品正面实拍（已抠图、屏幕反光已清除）
    ├── product-side-clean.png    产品侧面实拍（同上）
    └── ui-screen.png             产品屏幕 UI 设计稿（360×360 原图）
```

## 说明

- 角色立绘为演示素材，版权归原权利方；仅用于项目展示，不作商业用途。
- 字体走 Google Fonts（Noto Sans SC / Noto Serif SC / Chakra Petch），加载不到时自动回退系统字体，不影响阅读。
