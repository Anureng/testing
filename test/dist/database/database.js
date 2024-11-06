"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = (uri) => {
    mongoose_1.default.connect(uri, { dbName: "frame" })
        .then(() => {
        console.log('Connected to database');
    })
        .catch(() => {
        console.log("getting error connecting with database");
    });
};
exports.connectDb = connectDb;
//# sourceMappingURL=database.js.map