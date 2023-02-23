# English for developers backend

## Pocketbase hosted on fly.io

See https://github.com/pocketbase/pocketbase/discussions/537 for more information.

Deploy using `flyctl deploy`

## Pocketbase hosted on localhost

See https://dev.to/marselit/build-and-deploy-a-pocketbase-project-oi4 for more details

To build and run pocketbase locally, run the following commands:

```bash
docker build -t english-for-devs .
docker run -it --rm -p 8090:8090 -v $(pwd)/pb_data:/pb/pb_data -v $(pwd)/pb_public:/pb/pb_public -v $(pwd)/pb_migrations:/pb/pb_migrations english-for-devs
```

go to http://localhost:8090/_ to complete the installation