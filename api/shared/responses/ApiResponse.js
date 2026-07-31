class ApiResponse {
  constructor(statusCode = 200, message = "Success", data = null, meta = {}) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}

export default ApiResponse;
