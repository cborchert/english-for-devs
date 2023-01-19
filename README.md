# English for devs

*Built with create-svelte*

## Getting started

Install the dependencies with `npm install` (or `pnpm install` or `yarn`);

### Spin up the pocketbase instance

```bash 
docker build -t english-for-devs ./_backend/Dockerfile ## First time only
docker run -it --rm -p 8090:8090 -v $(pwd)/pb_data:/pb/pb_data -v $(pwd)/pb_public:/pb/pb_public english-for-devs
```

Go to http://localhost:8090/_ to complete the installation. Don't forget to set up the mail settings. 

Set up the environment variables in `.env`:

```bash
VITE_POCKETBASE_URL=http://127.0.0.1:8090
```

Start the dev server with `npm run dev` (or `pnpm dev` or `yarn dev`).


## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deploying the pocketbase backend

Check the readme in `_backend/` for more information on how to deploy to fly.io.

## Deploying the sveltekit app

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

We're deploying to netlify without any special set up so we're sticking with the default adapter (`adapter-auto`). A netlify.toml file is included in the project root.

Don't forget to set up a `VITE_POCKETBASE_URL` environment variable in the netlify UI.

