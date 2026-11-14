# 向研婷个人网站

React + Vite 个人作品集。首屏使用 React Bits `DotField`，下方沿用 `Particles` 背景。

在线访问：[向研婷 · 数据工程作品集](https://yantingxiang336-collab.github.io/personal_website/)

备用地址：[chatgpt.site 版本](https://cilare-xiang-portfolio.folksychant1.chatgpt.site/)

## 运行

```bash
pnpm install
pnpm dev
```

打开终端显示的本地地址。正式构建使用 `pnpm build`。

## 替换资料

- 邮箱、电话和简历下载已接入 `src/Portfolio.jsx`，简历文件位于 `public/resume.pdf`。
- 项目与技能内容也位于 `src/Portfolio.jsx`，便于后续迭代。

技能说明根据用户提供的简历整理；项目卡片加入 `PixelCard` 与 `BorderGlow` 效果。
