# Pubsub GKE
A project with very fancy architecture!

## Description
This project has been made to get familiar with event-driven microservice architecture. There is a React frontend, an Express.js REST API backend, an nginx reverse proxy, and an email notification service. The backend publishes a message to a Google Cloud PubSub topic, which is subscribed to by the email notifier. 