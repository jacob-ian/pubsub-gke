# Pubsub GKE
A project with very fancy architecture!

## Description
This project has been made to get familiar with event-driven microservices architecture. 
## Microservices
- Frontend (React)
- REST API Backend (Express.js)
- Email Notifier (Express.js)
- nginx Reverse Proxy
- MongoDB Database
- Google Cloud PubSub

## Architecture Flow
1. User creates profile with frontend
2. Backend adds user to MongoDB and publishes event to `NEW_USER` topic.
3. Email Notifier subscribes to `NEW_USER` topic, and sends the newly created user a welcome email.
