FROM node:current as frontend
WORKDIR /frontend
COPY ./frontend .
COPY .env .

RUN npm run production

FROM golang:1.12 as builder

WORKDIR /go/app
COPY ./api .

RUN CGO_ENABLED=0 GOOS=linux go build -v -o app main.go

FROM gcr.io/distroless/base
COPY --from=builder /go/app/app /app
COPY --from=frontend /frontend/out /out/
CMD ["/app"]