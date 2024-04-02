FROM python:3.10-slim as base

ARG PROJECT=plant_tracker
ENV PROJECT=$PROJECT

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user to run the app with.
RUN groupadd --gid 1000 apiuser &&  adduser --disabled-password --gecos '' --uid 1000 --gid 1000 apiuser
USER apiuser

WORKDIR /home/apiuser
COPY --chown=apiuser:apiuser requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install -r requirements.txt


FROM base as dev

COPY --chown=apiuser:apiuser ./$PROJECT /home/apiuser/$PROJECT

WORKDIR /home/apiuser/$PROJECT
EXPOSE 8000
ENTRYPOINT ["python3"] 
CMD ["manage.py", "runserver", "0.0.0.0:8000"]

