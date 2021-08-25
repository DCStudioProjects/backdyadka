exports.errorHandler = (error, api) => {
  if (error.response) {
    api.status(500).send({
      comment: "Request made and server responded",
      message: error.response.data,
      status: error.response.status,
    });
  } else if (error.request) {
    api.status(500).send({
      comment: "The request was made but no response was received",
      request: error.request.toString(),
    });
  } else {
    api.status(500).send({
      comment:
        "Something happened in setting up the request that triggered an Error",
      message: error,
    });
  }
};
