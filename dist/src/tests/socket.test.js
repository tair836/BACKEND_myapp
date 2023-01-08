"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const supertest_1 = __importDefault(require("supertest"));
const post_model_1 = __importDefault(require("../models/post_model"));
const user_model_1 = __importDefault(require("../models/user_model"));
const userEmail = "user1@gmail.com";
const userPassword = "12345";
const userEmail2 = "user2@gmail.com";
const userPassword2 = "12345";
const newPost = { message: 'this is my new message', sender: '12345' };
const sender = '12345';
const updateMessage = "This is the updated message";
const messages = { m1: "message 1", m2: "message 2" };
let client1;
let client2;
function clientSocketConnect(clientSocket) {
    return new Promise((resolve) => {
        clientSocket.on("connect", () => {
            resolve("1");
        });
    });
}
const connectUser = (userEmail, userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const response1 = yield (0, supertest_1.default)(app_1.default).post('/auth/register').send({
        "email": userEmail,
        "password": userPassword
    });
    const userId = response1.body._id;
    const response = yield (0, supertest_1.default)(app_1.default).post('/auth/login').send({
        "email": userEmail,
        "password": userPassword
    });
    const token = response.body.accessToken;
    const socket = (0, socket_io_client_1.default)('http://localhost:' + process.env.PORT, {
        auth: {
            token: 'barrer ' + token
        }
    });
    yield clientSocketConnect(socket);
    const client = { socket: socket, accessToken: token, id: userId };
    return client;
});
describe("my awesome project", () => {
    jest.setTimeout(15000);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield post_model_1.default.remove();
        yield user_model_1.default.remove();
        client1 = yield connectUser(userEmail, userPassword);
        client2 = yield connectUser(userEmail2, userPassword2);
        console.log("finish beforeAll");
    }));
    afterAll(() => {
        client1.socket.close();
        client2.socket.close();
        app_1.default.close();
        mongoose_1.default.connection.close();
    });
    test("Echo res", (done) => {
        client1.socket.once("echo:echo_res", (arg) => {
            expect(arg.msg).toBe('hello');
            done();
        });
        client1.socket.emit("echo:echo", { 'msg': 'hello' });
    });
    test("Echo req", (done) => {
        client1.socket.once("echo:echo_req", () => {
            done();
        });
        client1.socket.emit("echo:read");
    });
    test("Add a new post test", (done) => {
        client1.socket.once('post:post', (arg) => {
            expect(arg.status).toBe('OK');
            expect(arg.data.message).toEqual(newPost.message);
            expect(arg.data.sender).toEqual(newPost.sender);
            done();
        });
        client1.socket.emit("post:post");
    });
    test("Get all posts test", (done) => {
        client1.socket.once('post:get', (arg) => {
            expect(arg.status).toBe('OK');
            done();
        });
        client1.socket.emit("post:get");
    });
    test("Get post by id test", (done) => {
        client1.socket.once('post:get:id', (arg) => {
            expect(arg.status).toBe('OK');
            expect(arg.id).toEqual(client1.id);
            done();
        });
        client1.socket.emit("post:get:id");
    });
    test("Get post by sender test", (done) => {
        client1.socket.once('post:get:sender', (arg) => {
            expect(arg.status).toBe('OK');
            expect(arg.data[0].sender).toEqual(sender);
            done();
        });
        client1.socket.emit("post:get:sender");
    });
    test("Update post by id test", (done) => {
        client1.socket.once('post:put', (arg) => {
            expect(arg.status).toBe('OK');
            expect(arg.data.message).toEqual(updateMessage);
            expect(arg.data.sender).toEqual(sender);
            done();
        });
        client1.socket.emit("post:put");
    });
    test("Chat messages test", (done) => {
        const message = "hi... test 123";
        client2.socket.once('chat:message', (args) => {
            expect(args.to).toBe(client2.id);
            expect(args.message).toBe(message);
            expect(args.from).toBe(client1.id);
            done();
        });
        client1.socket.emit("chat:send_message", { 'to': client2.id, 'message': message });
    });
    test("Get all messages chat", (done) => {
        client1.socket.once('chat:all_messages', (args) => {
            expect(args.messages.m1).toBe(messages.m1);
            expect(args.messages.m2).toBe(messages.m2);
            expect(args.from).toBe(client1.id);
            done();
        });
        client1.socket.emit("chat:get_all", { 'from': client1.id, 'messages': messages });
    });
});
//# sourceMappingURL=socket.test.js.map