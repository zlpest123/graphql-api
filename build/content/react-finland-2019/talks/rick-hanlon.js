"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../../../server/schema");
const rick_hanlon_1 = __importDefault(require("../../people/rick-hanlon"));
const talk = {
    people: [rick_hanlon_1.default],
    title: "Mysterious keynote",
    description: ``,
    type: schema_1.SessionType.KEYNOTE,
    keywords: [],
};
exports.default = talk;
//# sourceMappingURL=rick-hanlon.js.map