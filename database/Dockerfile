# DOCKER-VERSION 1.0.0

FROM postgres:9.3
ENV POSTGRES_DB pesto_orders

COPY init/001_create_table.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

# expose volumes for logging and utilize raid
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]