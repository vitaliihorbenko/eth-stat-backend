const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      if (error.name === "CastError") {
        error.status = 404;
      }
      next(error);
    }
  };
  return func;
};

module.exports = ctrlWrapper;
