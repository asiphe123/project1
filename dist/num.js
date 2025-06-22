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
exports.numbersum = numbersum;
const node_fetch_1 = __importDefault(require("node-fetch"));
function numbersum() {
    return __awaiter(this, void 0, void 0, function* () {
        const num = process.argv.slice(2).map(Number);
        const sum = num.reduce((a, b) => a + b, 0);
        const ToDo = `https://jsonplaceholder.typicode.com/todos/1`;
        try {
            const response = yield (0, node_fetch_1.default)(ToDo);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = yield response.json();
            const output = `sum:${sum}, Title: ${data.title}`;
            console.log(output);
            return output;
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'unknown error';
            const errorMessage = `error: ${message}`;
            console.error(errorMessage);
            return errorMessage;
        }
    });
}
if (require.main === module) {
    numbersum();
}
