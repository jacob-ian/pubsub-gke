export class EventPublisherException extends Error {
  constructor(error: unknown) {
    let errorString: string;
    if (typeof error === "string") {
      errorString = error;
    } else {
      errorString = JSON.stringify(error, null, 2);
    }

    super(errorString);
  }
}
