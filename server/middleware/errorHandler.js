
function errorHandler(err, req, res, next) {
    // Avoid sending another response if headers were already sent
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || err.status || 500;

    // Handle invalid JSON requests separately
    if (err.type === "entity.parse.failed") {
        console.warn("Rejected request with invalid JSON.");

        return res.status(400).json({
            message: "Invalid JSON request body"
        });
    }

    // Log unexpected server errors
    if (statusCode >= 500) {
        console.error(err);
    }

    res.status(statusCode).json({
        message: statusCode >= 500
            ? "Internal server error"
            : err.message
    });
}

module.exports = errorHandler;
