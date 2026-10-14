# Happy Birthday, Ladli

A small runway-themed birthday site for **Ladli Updhyay** (15 October).

## Run locally

```bash
cd ~/Projects/ladli-birthday
nvm use 22   # Node 20+ recommended
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Share with family

Build static files and host anywhere (Netlify, Vercel, GitHub Pages, or send the `dist` folder):

```bash
npm run build
npm run preview
```

The built site is in `dist/`.

## Deploy on Vercel (recommended)

Source repo: [github.com/sudhir-tiwari2002/ladli-birthday](https://github.com/sudhir-tiwari2002/ladli-birthday)

**Option A — Vercel dashboard (fastest)**

1. Open [vercel.com/new](https://vercel.com/new) and sign in.
2. Import **ladli-birthday** from GitHub.
3. Use defaults: **Vite**, build `npm run build`, output **dist**.
4. Deploy — your live URL will look like `https://ladli-birthday.vercel.app`.

**Option B — CLI**

```bash
nvm use 22
cd ~/Projects/ladli-birthday
npx vercel login
npx vercel --prod
```
