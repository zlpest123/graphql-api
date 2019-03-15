import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getConference } from "../Conference";
import { Contact, ContactType, getSessionSpeakers } from "../Contact";
import { IContext } from "../Context";
import { Country } from "../Country";
import { Image } from "../Image";
import { resolveSessions } from "../Schedule";
import SessionType from "../SessionType";
import { Social } from "../Social";

@Resolver(_ => Contact)
class ContactResolver {
  @Query(_ => Contact)
  public contact(
    @Arg("contactName") contactName: string,
    @Arg("conferenceId", _ => ID) conferenceId: string
  ) {
    const conference = getConference(conferenceId);
    const sponsor = conference.sponsors.find(
      ({ name }) => name === contactName
    );
    const organizer = Object.values(conference.organizers).find(
      ({ name }) => name === contactName
    );
    const talks = resolveSessions(conference.schedules, [
      SessionType.LIGHTNING_TALK,
      SessionType.TALK,
      SessionType.KEYNOTE,
    ]);
    const speaker = getSessionSpeakers(conference, talks).find(
      ({ name }) => name === contactName
    );
    const workshops = resolveSessions(conference.schedules, [
      SessionType.WORKSHOP,
    ]);
    const workshopInstructor = getSessionSpeakers(conference, workshops).find(
      ({ name }) => name === contactName
    );
    const mc =
      conference.mcs && conference.mcs.find(({ name }) => name === contactName);
    const contact = sponsor || organizer || speaker || workshopInstructor || mc;

    if (!contact) {
      throw new Error(`Contact ${contactName} wasn't found!`);
    }

    return contact;
  }

  @FieldResolver(_ => [ContactType])
  public type(@Root() contact: Contact) {
    return contact.type || [];
  }

  @FieldResolver(_ => Image)
  public image(@Root() contact: Contact, @Ctx() ctx: IContext) {
    // FIXME: Figure out why ctx can be missing
    return {
      url: `${ctx ? ctx.mediaUrl : "/media"}/${contact.image.url}`,
    };
  }

  @FieldResolver(_ => String)
  public aboutShort(@Root() contact: Contact) {
    if (contact.aboutShort) {
      return contact.aboutShort;
    } else {
      return contact.about ? contact.about.split(".")[0] + "." : "";
    }
  }

  @FieldResolver(_ => Social)
  public social(@Root() contact: Contact) {
    interface IRules {
      [key: string]: string | undefined;
    }
    const social = contact.social;

    // TODO: These resolvers should fork so you get url + original value
    // as that's needed sometimes
    const rules: IRules = {
      homepage: social.homepage,
      facebook: social.facebook && `https://facebook.com/${social.facebook}`,
      github: social.github && `https://github.com/${social.github}`,
      linkedin: resolveLinkedin(social.linkedin),
      medium: social.medium && `https:// medium.com/${social.medium}`,
      instagram:
        social.instagram && `https://instagram.com/${social.instagram}`,
      twitter: social.twitter && `https://twitter.com/${social.twitter}`,
      youtube: social.youtube && `https://www.youtube.com/${social.youtube}`,
      vk: social.vk && `https://vk.com/${social.vk}`,
    };
    const result: IRules = {};

    Object.keys(social).forEach(media => {
      if (rules[media]) {
        result[media] = rules[media];
      }
    });

    return result;
  }

  @FieldResolver(_ => Country, { deprecationReason: "Use `location` instead" })
  public country(@Root() contact: Contact) {
    return contact.location.country;
  }
}

function resolveLinkedin(linkedin?: string): string {
  if (!linkedin) {
    return "";
  }

  if (linkedin.startsWith("company")) {
    return `https://linkedin.com/${linkedin}`;
  }

  return `https://linkedin.com/in/${linkedin}`;
}

export default ContactResolver;
