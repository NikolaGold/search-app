This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

#Project info
This is a search application for browsing flat offers.
It is created in Next.js with TypeScript, Styled component, React-hook-form, Material-ui, Eslint, Prettier.

##Getting Started

1. Install node modules
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction)
[http://localhost:3000/api/search](http://localhost:3000/api/search). This endpoint can be edited in `pages/api/search.ts`

API routes **http://localhost:3000/api/flat-detail/[id]** This endpoint can be edited in `pages/api/flat-detail/[id]`

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## How to create a Static export and build

1. Run the dev server:
```bash
npm run dev
# or
yarn dev
```

2. Run build

```bash
npm run build
# or
yarn build
```

## How to run static export
After creating static export:
```bash
serve out
```
