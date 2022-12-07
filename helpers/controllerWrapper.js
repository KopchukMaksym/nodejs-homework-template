function controllerWrapper(controller) {
    const fn = async (req, res, next) => {
        try {
            await controller(req, res);
        } catch (error) {
            // throw createError({ status: 404, message: "Not Foyund" });
            next(error);
        }
    };

    return fn;
}

module.exports = controllerWrapper;
