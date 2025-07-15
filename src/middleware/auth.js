export const userauth = (req, res, next) => {
  const token = "xyz";
  const isadminauthenticated = token === "xyz";

  if (!isadminauthenticated) {
    return res.status(401).send("You are not authenticated, bro!");
  } else {
    next(); // Allow access to next middleware or route
  }
};
