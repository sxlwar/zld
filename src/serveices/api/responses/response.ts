
export abstract class ResponseHandler {
  abstract handleSuccess(): void;
  abstract handleFail(): void;
}
