FROM gcr.io/google.com/cloudsdktool/cloud-sdk:355.0.0-emulators

ARG GCLOUD_PROJECT_ID
ARG HOST
ARG PORT

EXPOSE 8085

CMD gcloud beta emulators pubsub start --project=${GCLOUD_PROJECT_ID} --quiet --host-port=${HOST}:${PORT} --verbosity=debug