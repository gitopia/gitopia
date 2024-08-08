ARG IMG_TAG=latest

# Compile the gitopiad binary
FROM golang:1.22-alpine AS gitopiad-builder
WORKDIR /src/app/
ENV PACKAGES="curl make git libc-dev bash file gcc linux-headers eudev-dev"
RUN apk add --no-cache $PACKAGES

COPY go.mod go.sum* ./
RUN go mod download

COPY . .
RUN LEDGER_ENABLED=false LINK_STATICALLY=true make build
RUN echo "Ensuring binary is statically linked ..."  \
    && file /src/app/build/gitopiad | grep "statically linked"

FROM alpine:$IMG_TAG
RUN apk add --no-cache build-base
RUN adduser -D nonroot
ARG IMG_TAG
COPY --from=gitopiad-builder  /src/app/build/gitopiad /usr/local/bin/
EXPOSE 26656 26657 1317 9090
USER nonroot

ENTRYPOINT ["gitopiad", "start"]
