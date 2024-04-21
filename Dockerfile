FROM node:20-alpine as react_builder
WORKDIR /app
COPY ./plant_tracker/frontend/package.json .
COPY ./plant_tracker/frontend/yarn.lock .
RUN yarn install
COPY ./plant_tracker/frontend . 
RUN npm run build


FROM python:3.10 as base

ARG PROJECT=plant_tracker
ENV PROJECT=$PROJECT

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libpq-dev python3-dev libpq5 postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user to run the app with.
RUN groupadd --gid 1000 apiuser &&  adduser --disabled-password --gecos '' --uid 1000 --gid 1000 apiuser
USER apiuser

WORKDIR /home/apiuser
COPY --chown=apiuser:apiuser requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install -r requirements.txt


FROM base as final

COPY --chown=apiuser:apiuser ./$PROJECT /home/apiuser/$PROJECT
COPY --from=react_builder /app/dist /home/apiuser/$PROJECT/frontend/dist

WORKDIR /home/apiuser/$PROJECT
EXPOSE 8000
ENTRYPOINT ["bash", "docker-entrypoint.sh"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
