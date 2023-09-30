FROM python:3.10-slim as base

ARG PROJECT=plant_tracker_api

# Create a non-root user to run the app with.
RUN groupadd --gid 1000 apiuser &&  adduser --disabled-password --gecos '' --uid 1000 --gid 1000 apiuser
USER apiuser

WORKDIR /home/apiuser

# Install Poetry.
RUN --mount=type=cache,target=/root/.cache pip install --user poetry==1.4.2
ENV \
    PATH="/home/apiuser/.local/bin:/home/apiuser/.venv/bin:${PATH}" \
    PYTHONUNBUFFERED=1 \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=true

COPY --chown=apiuser:apiuser ./backend/pyproject.toml ./backend/poetry.lock ./backend/plant_tracker_api/alembic.ini ./
RUN --mount=type=cache,target=/root/.cache poetry install

FROM base as dev

COPY --chown=apiuser:apiuser ./backend/$PROJECT /home/apiuser/$PROJECT

WORKDIR /home/apiuser/$PROJECT

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]


FROM base as test

RUN --mount=type=cache,target=/root/.cache poetry install --with dev
COPY --chown=apiuser:apiuser ./$PROJECT /home/apiuser/$PROJECT
RUN mkdir /home/apiuser/.mypy_cache && chown -R apiuser:apiuser /home/apiuser/.mypy_cache

# Default target.
FROM dev