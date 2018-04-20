module.exports = (req, res, next) => {
  // next = when middleware is completed
  if (!req.user) {
    return res.status(401).send({ error: 'Please log in' });
  }

  next(); // else --> continue on to the next request handler
};
