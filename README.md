# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

### Prerequisites

Ensure you have a `.env` file in the root of the project directory. Use the `sample.env` file provided as a reference for the required environment variables.

---

### Running the Development Server

You can run both the client and server with a single command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This will start both the Next.js frontend and the backend server concurrently.

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend.
- Backend API routes are accessible at paths prefixed with `/api/*`. For example, [http://localhost:4001/api/](http://localhost:3000/api/).

You can start editing the frontend by modifying `pages/index.js`. The page auto-updates as you edit the file.

---

### API Routes

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) are located in the `pages/api` directory. These files are mapped to `/api/*` and treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

You can access a sample API endpoint at [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

---

### Fonts

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family from Vercel.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - An interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

---

### Environment Variables

To run the application, set up the environment variables as described in the `sample.env` file located in the root of the project. Copy the `sample.env` file to `.env` and update the values as per your setup:

```bash
cp sample.env .env
```

---

This setup ensures both the client and server work seamlessly together during development.
