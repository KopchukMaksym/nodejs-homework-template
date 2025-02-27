const messages = {
    400: "Bad Request",
    404: "Not Found",
};

function createError({ status, message = messages[status] }) {
    const error = new Error(message);

    error.status = status;

    return error;
}

module.exports = createError;
