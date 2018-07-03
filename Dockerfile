FROM golang

EXPOSE 5003

# RUN apk --no-cache add git bash go make gcc sqlite
RUN mkdir -p /go/src /go/pkg /go/bin && chmod -R 777 /go

# ENV GOROOT /usr/lib/go
ENV GOPATH /go
ENV PATH $GOPATH/bin:$PATH

ADD Makefile /usr/src/app/Makefile
ADD dist/ /usr/src/app
ADD output/sweet-basil-pesto-dev /usr/src/app
ADD pesto_db/files/pesto.db /usr/src/app/pesto_db/files/
ADD dist/ /usr/src/app/dist/

WORKDIR /usr/src/app

# ENTRYPOINT ["./output/sweet-basil-pesto-dev"]
CMD ["./sweet-basil-pesto-dev"]

