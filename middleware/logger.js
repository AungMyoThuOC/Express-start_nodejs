 const myLogger = (req, res, next) => {
    console.log("Hello From Sever  👋");
    next();
}

module.exports = myLogger;

