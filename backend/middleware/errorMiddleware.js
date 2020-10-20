const notFound = (req, res, next) => {
  console.log('called 1');
  const error = new Error(`Not Found - ${req.originalUrl}`);

  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log(res.statusCode);
  //Sometimes an error can have the status code of 200 even though its an error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
