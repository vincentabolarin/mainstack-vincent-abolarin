class SuccessResponse {
  public success: boolean;
  public message: string;
  public data?: any;

  constructor(message: string, data?: any) {
    this.success = true;
    this.message = message;
    if (data) {
      this.data = data;
    }
  }
}

class ErrorResponse {
  public success: boolean;
  public message: string;
  public error?: any;

  constructor(message: string, error?: any) {
    this.success = false;
    this.message = message;
    if (error) {
      this.error = error;
    }
  }
}

export { SuccessResponse, ErrorResponse };