module.exports = () => {
    let login = function (req, res, next) {
        if (req.params.id !== '1') {
            return res.json('Your access is denied!');
        }
        next();
    };

    return {login};
};