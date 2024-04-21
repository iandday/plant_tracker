FROM node:20-alpine as react_builder
WORKDIR /app
COPY ./plant_tracker/frontend/package.json .
COPY ./plant_tracker/frontend/yarn.lock .
RUN yarn install
COPY ./plant_tracker/frontend . 
RUN npm run build


FROM python:3.10-alpine as base

ARG PROJECT=plant_tracker
ENV PROJECT=$PROJECT

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apk add --update --virtual .build-deps \
    build-base \
    postgresql-dev \
    python3-dev \
    libpq \
    libffi-dev

COPY ./requirements.txt /app/requirements.txt
RUN pip install --upgrade pip && \
    pip install -r /app/requirements.txt




FROM python:3.10-alpine
ENV PYTHONUNBUFFERED 1
RUN apk add libpq
COPY --from=base /usr/local/lib/python3.10/site-packages/ /usr/local/lib/python3.10/site-packages/
COPY --from=base /usr/local/bin/ /usr/local/bin/


RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

WORKDIR /app
COPY --chown=apiuser:apiuser ./plant_tracker /app/plant_tracker
COPY --from=react_builder /app/dist /app/plant_tracker/frontend/dist

WORKDIR /app/plant_tracker
EXPOSE 8000
ENTRYPOINT ["ash", "docker-entrypoint.sh"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

