FROM hayd/alpine-deno:1.0.0

EXPOSE 3000

WORKDIR /app

USER deno

COPY deps.ts .
RUN deno cache deps.ts

COPY . .
RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-read", '--allow-env', "app.ts"]