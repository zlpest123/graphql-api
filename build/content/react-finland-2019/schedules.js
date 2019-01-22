"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../../server/schema");
const people = __importStar(require("../people"));
const talks = __importStar(require("./talks"));
const allWorkshops = __importStar(require("./workshops"));
const workshops = Object.values(allWorkshops);
const workshopDay = {
    day: "2019-04-24",
    description: "Workshop day",
    intervals: [
        {
            begin: "08:00",
            end: "09:00",
            sessions: [
                {
                    type: schema_1.SessionType.ORGANIZATIONAL,
                    title: "Registration",
                },
            ],
        },
        {
            begin: "09:00",
            end: "11:30",
            sessions: workshops,
        },
        {
            begin: "11:30",
            end: "12:30",
            sessions: [
                {
                    type: schema_1.SessionType.LUNCH,
                    title: "Lunch",
                },
            ],
        },
        {
            begin: "12:30",
            end: "14:00",
            sessions: workshops,
        },
        {
            begin: "14:00",
            end: "14:20",
            sessions: [
                {
                    type: schema_1.SessionType.COFFEE_BREAK,
                    title: "Break",
                },
            ],
        },
        {
            begin: "14:20",
            end: "15:40",
            sessions: workshops,
        },
        {
            begin: "15:40",
            end: "16:00",
            sessions: [
                {
                    type: schema_1.SessionType.COFFEE_BREAK,
                    title: "Break",
                },
            ],
        },
        {
            begin: "16:00",
            end: "17:30",
            sessions: workshops,
        },
    ],
};
const presentationDay1 = {
    day: "2019-04-25",
    description: "Presentation day",
    intervals: [
        {
            begin: "09:00",
            end: "09:15",
            sessions: [
                {
                    people: [people.janiEvakallio],
                    title: "Opening",
                    description: "Opening the day with Jani Eväkallio, our MC of the day",
                    type: schema_1.SessionType.ORGANIZATIONAL,
                },
            ],
        },
        {
            begin: "09:15",
            end: "10:45",
            title: "State management",
            sessions: [
                talks.michelWeststrate,
                talks.davidKhourshid,
                talks.lucaMatteis,
            ],
        },
        {
            begin: "10:45",
            end: "11:15",
            sessions: [
                {
                    type: schema_1.SessionType.COFFEE_BREAK,
                    title: "Break",
                    description: "Drink coffee, live long and prosper",
                },
            ],
        },
        {
            begin: "11:15",
            end: "12:15",
            title: "Testing",
            sessions: [
                talks.juhaLinnanen,
                talks.maaretPyhajarvi,
                talks.manuelMatuzovic,
            ],
        },
        {
            begin: "12:15",
            end: "13:30",
            sessions: [
                {
                    type: schema_1.SessionType.LUNCH,
                    title: "Lunch",
                    description: "Hopefully it's as disappointing as the one you had at GraphQL Finland",
                },
            ],
        },
        {
            begin: "13:30",
            end: "14:30",
            title: "Design Systems",
            sessions: [talks.andreyOkonetchnikov, talks.varyaStepanova],
        },
        {
            begin: "14:30",
            end: "15:00",
            sessions: [
                {
                    type: schema_1.SessionType.COFFEE_BREAK,
                    title: "Break",
                    description: "Drink coffee. Again.",
                },
            ],
        },
        {
            begin: "15:00",
            end: "16:00",
            title: "Case Studies",
            sessions: [talks.nikGraf, talks.kadiKraman, talks.glennReyes],
        },
        {
            begin: "16:00",
            end: "16:30",
            sessions: [
                {
                    type: schema_1.SessionType.COFFEE_BREAK,
                    title: "Break",
                    description: "Drink coffee if you still can.",
                },
            ],
        },
        {
            begin: "16:30",
            end: "17:30",
            title: "Visual",
            sessions: [talks.brunoLourenco, talks.teroParviainen],
        },
        {
            begin: "17:30",
            end: "18:00",
            sessions: [
                {
                    type: schema_1.SessionType.ORGANIZATIONAL,
                    title: "Closing ceremonies",
                },
            ],
        },
        {
            begin: "18:00",
            end: "22:00",
            sessions: [
                {
                    people: [people.janiEvakallio],
                    title: "#componentDidSmoosh",
                    description: "React has a new lifecycle method, `componentDidSmoosh`. Learn all about it.",
                    type: schema_1.SessionType.PARTY,
                },
            ],
        },
    ],
};
const presentationDay2 = {
    day: "2019-04-26",
    description: "Presentation day",
    intervals: [
        {
            begin: "09:00",
            end: "09:15",
            sessions: [
                {
                    people: [people.saraVieira],
                    title: "Opening",
                    description: "Opening the day with Sara Vieira, our MC of the day",
                    type: schema_1.SessionType.ORGANIZATIONAL,
                },
            ],
        },
        {
            begin: "09:15",
            end: "10:45",
            title: "React Native",
            sessions: [talks.rickHanlon, talks.jamonHolmgren, talks.villeImmonen],
        },
        {
            begin: "10:45",
            end: "11:15",
            sessions: [
                {
                    type: schema_1.SessionType.COFFEE_BREAK,
                    title: "Break",
                    description: "Drink coffee. Finnish coffee is darker than you think.",
                },
            ],
        },
        {
            begin: "11:15",
            end: "12:15",
            title: "Tooling",
            sessions: [talks.carolynStransky, talks.monicaLent],
        },
        {
            begin: "12:15",
            end: "13:30",
            sessions: [
                {
                    type: schema_1.SessionType.LUNCH,
                    title: "Lunch",
                    description: "Hopefully it's as disappointing as day before.",
                },
            ],
        },
        {
            begin: "13:30",
            end: "14:30",
            title: "Design Systems",
            sessions: [talks.artemSapegin, talks.artemZakharchenko],
        },
        {
            begin: "14:30",
            end: "15:00",
            sessions: [
                {
                    type: schema_1.SessionType.COFFEE_BREAK,
                    title: "Break",
                    description: "Drink coffee. Again.",
                },
            ],
        },
        {
            begin: "15:00",
            end: "16:00",
            title: "Performance",
            sessions: [talks.annaDoubkova, talks.siaKaramalegos],
        },
        {
            begin: "16:00",
            end: "16:30",
            sessions: [
                {
                    type: schema_1.SessionType.COFFEE_BREAK,
                    title: "Break",
                    description: "Drink coffee if you still can.",
                },
            ],
        },
        {
            begin: "16:30",
            end: "17:30",
            title: "Universal React",
            sessions: [talks.tomasKonrady, talks.tejasKumar, talks.mikeBerman],
        },
        {
            begin: "17:30",
            end: "18:00",
            sessions: [
                {
                    type: schema_1.SessionType.ORGANIZATIONAL,
                    title: "Closing ceremonies",
                },
            ],
        },
    ],
};
exports.default = [workshopDay, presentationDay1, presentationDay2];
//# sourceMappingURL=schedules.js.map