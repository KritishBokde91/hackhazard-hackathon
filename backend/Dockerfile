
FROM python:3.13.2-slim-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install --upgrade setuptools wheel
RUN pip install --no-cache-dir --upgrade -r  requirements.txt

COPY . .

EXPOSE 7000

CMD uvicorn src.app.main:app --host 0.0.0.0 --port 7000
