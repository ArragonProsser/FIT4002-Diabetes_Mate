FROM python:3.7.4-slim
COPY . .
RUN apt-get --quiet update && \
    apt-get --no-install-recommends --quiet install -y groff less xxd && \
    pip install --no-cache-dir --force-reinstall -r requirements.txt && \
    mkdir -p ${HOME}/.aws && touch ${HOME}/.aws/config
