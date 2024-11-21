const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
  
    const statusCode = err.statusCode || 500; // Default to 500 if status code is not set
    const message = err.message || "Server Error";
  
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
  module.exports = errorMiddleware;