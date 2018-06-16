FROM alpine:3.4

RUN apk --no-cache add bash go make

RUN mkdir -p /go/src /go/bin && chmod -R 777 /go
ENV GOPATH /go
ENV PATH /go/bin:$PATH

ADD dist/* /usr/src/app
ADD sweet-basil-pesto-dev /usr/src/app

WORKDIR /usr/src/app

CMD ["make", "run"]


