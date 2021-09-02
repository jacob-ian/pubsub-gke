FROM gcr.io/google.com/cloudsdktool/cloud-sdk:355.0.0-emulators

EXPOSE 8085

CMD gcloud beta emulators pubsub start --project=${GCLOUD_PROJECT_ID} --quiet --host-port=${HOST}:${PORT} --verbosity=debug