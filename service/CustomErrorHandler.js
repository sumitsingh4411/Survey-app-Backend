class CustomErrorHandler extends Error {

    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }

    static alreadyExist(message) {
        return new CustomErrorHandler(409, message);
    }

    static wrongcreadintials(message) {
        return new CustomErrorHandler(401, message);
    }

    static Aunauthroize(message="unauthorize") {
        return new CustomErrorHandler(401, message);
    }

    static notfound(message) {
        return new CustomErrorHandler(404, message);
    }
    static servererror(message="internal server error") {
        return new CustomErrorHandler(500, message);
    }
}

export default CustomErrorHandler;