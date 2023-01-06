"use strict";
module.exports = (io, socket) => {
    const echoHandler = (payload) => {
        console.log("echo:echo");
        socket.emit('echo:echo_res', payload);
    };
    const readHandler = (payload) => {
        console.log("echo:read");
        socket.emit('echo:echo_req', payload);
    };
    console.log("register echo handler");
    socket.on("echo:echo", echoHandler);
    socket.on("echo:read", readHandler);
};
//# sourceMappingURL=echoHandler.js.map