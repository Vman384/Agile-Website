const DEFAULT_NAMESPACE = "Client";

function info(message: any, namespace?: string) {
    if (typeof message === "string") {
        console.log(
            `[${getDate()}] [${
                namespace ?? DEFAULT_NAMESPACE
            }] [INFO] ${message}`
        );
    } else {
        console.log(
            `[${getDate()}] [${namespace ?? DEFAULT_NAMESPACE}] [INFO]`,
            message
        );
    }
}

function warn(message: any, namespace?: string) {
    if (typeof message === "string") {
        console.log(
            `[${getDate()}] [${
                namespace ?? DEFAULT_NAMESPACE
            }] [WARN] ${message}`
        );
    } else {
        console.log(
            `[${getDate()}] [${namespace ?? DEFAULT_NAMESPACE}] [WARN]`,
            message
        );
    }
}

function error(message: any, namespace?: string) {
    if (typeof message === "string") {
        console.log(
            `[${getDate()}] [${
                namespace ?? DEFAULT_NAMESPACE
            }] [ERROR] ${message}`
        );
    } else {
        console.log(
            `[${getDate()}] [${namespace ?? DEFAULT_NAMESPACE}] [ERROR]`,
            message
        );
    }
}

function getDate() {
    return new Date().toISOString();
}

const logging = { info, warn, error };

export default logging;
