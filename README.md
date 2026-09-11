# 🍳 Recipe Sharing Platform

A recipe-sharing web application built on the [T3 Stack](https://create.t3.gg/) — authentication, database and end-to-end typesafe APIs wired up; application features in active development.

## ✨ Tech Stack

- [Next.js 14](https://nextjs.org) (App Router) + TypeScript
- [tRPC](https://trpc.io) — end-to-end typesafe APIs
- [NextAuth.js](https://next-auth.js.org) — authentication
- [Prisma](https://www.prisma.io) + MySQL — database & ORM
- [TanStack Query](https://tanstack.com/query) · [Zod](https://zod.dev) · [Tailwind CSS](https://tailwindcss.com)

## 🚀 Getting Started

```bash
npm install
npm run db:push    # sync the Prisma schema with your database
npm run dev        # dev server → http://localhost:3000
```

Environment variables are validated in `src/env.js` (`DATABASE_URL`, NextAuth secret & providers).

## 📌 Status

> ⚠️ Bootstrapped with `create-t3-app` — the auth / database / typesafe API foundation is wired up and verified. Recipe & sharing features are being built on top.

---

Built by [Shahriar Iqbal](https://shahriariqbal.com) — [Portfolio](https://shahriariqbal.com) · [GitHub](https://github.com/shahriariqbal)
