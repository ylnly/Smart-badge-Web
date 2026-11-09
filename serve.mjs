// 零依赖静态服务器：node serve.mjs [port]
// 提供正确的 MIME 类型、路径穿越防护与 no-store 缓存策略。
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, normalize, extname, sep } from "node:path";

const ROOT = process.cwd();
const PORT = Number(process.argv[2] || process.env.PORT || 8080);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith("/")) pathname += "index.html";

    const target = normalize(join(ROOT, pathname));
    if (!target.startsWith(ROOT + sep) && target !== ROOT) {
      res.writeHead(403).end("Forbidden");
      return;
    }

    let file = target;
    const info = await stat(file).catch(() => null);
    if (info && info.isDirectory()) file = join(file, "index.html");

    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": MIME[extname(file).toLowerCase()] || "application/octet-stream",
      "Content-Length": body.length,
      "Cache-Control": "no-store"
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" })
       .end("<meta charset='utf-8'><h1>404</h1><p>页面不存在</p>");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`次元星徽展示页 → http://127.0.0.1:${PORT}/`);
});
