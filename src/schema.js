const { makeExecutableSchema } = require("graphql-tools");
const conferences = require("./conferences");
const series = require("./conferenceSeries");

const resolvers = {
  Query: {
    conference(root, { id }) {
      if (conferences[id]) {
        return conferences[id].content;
      } else {
        throw new Error("Unknown conference");
      }
    },
    allConferences() {
      return Object.keys(conferences).map(id => conferences[id].content);
    },
    series(root, { id }) {
      if (series[id]) {
        return series[id];
      } else {
        throw new Error("Unknown conference");
      }
    },
    allSeries() {
      return Object.keys(series).map(id => series[id]);
    },
  },
  Series: {
    conferences(series) {
      return series.conferences.map(
        conferenceId => conferences[conferenceId].content
      );
    },
  },
  Conference: {
    series(conference) {
      const id = conference.id;
      for (const seriesId of Object.keys(series)) {
        const oneSeries = series[seriesId];
        if (oneSeries.conferences.indexOf(id) !== -1) {
          return oneSeries;
        }
      }
    },
  },
};

const typeDefs = `
  type Query {
    conference(id: ID!): Conference
    allConferences: [Conference!]
    series(id: ID!): Series
    allSeries: [Series!]
  }

  type Series {
    id: ID!
    name: String!
    conferences: [Conference!]
  }

  type Conference {
    id: ID!
    name: String!
    year: String!
    packageName: String!
    staticFilePath: String!
    websiteUrl: String!
    series: Series!
    breakfasts: [Session]
    coffeeBreaks: [Session]
    keynotes: [Session]
    lightningTalks: [Session]
    locations: [Contact]
    lunches: [Session]
    organizers: [Contact]
    panels: [Session]
    sponsors: [Contact]
    partners: [Contact]
    goldSponsors: [Contact]
    silverSponsors: [Contact]
    bronzeSponsors: [Contact]
    pages: [Page]
    page(id: String): Page
    presentations: [Session]
    schedules: [Schedule]
    speakers: [Contact]
    talks: [Session]
    tickets: [[Ticket]]
    workshops: [Session]
  }

  type Session {
    day: String
    title: String
    description: String
    type: String
    speakers: [Contact]
    tickets: [Ticket]
    keywords: [String]
    location: Contact
    urls: SessionUrls
  }

  type SessionUrls {
    web: String
    slides: String
    video: String
  }

  type Page {
    id: String!
    title: String!
    description: String!
    intro: String
    main: String
    secondary: String
  }

  type Contact {
    name: String!
    about: String!
    image: String
    type: [String]
    social: Social
    keywords: [String]
    keynotes: [Session]
    lightningTalks: [Session]
    presentations: [Session]
    talks: [Session]
    workshops: [Session]
    location: Location
    country: Country
    city: String
    address: String
  }

  type Social {
    homepage: String
    twitter: String
    github: String
    facebook: String
    medium: String
    instagram: String
    linkedin: String
    youtube: String
    vk: String
  }

  type Location {
    country: Country
    city: String
    address: String
  }

  type Country {
    name: String
    code: String
  }

  type Schedule {
    day: String
    intervals: [Interval]
  }

  type Interval {
    begin: String
    end: String
    sessions: [Session]
  }

  type Ticket {
    name: String!
    amount: Int!
    currency: String!
    link: String
  }
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
