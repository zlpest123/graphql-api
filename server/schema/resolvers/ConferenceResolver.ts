import kebabCase from "just-kebab-case";
import * as path from "path";
import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import conferences from "../../conferences";
import { Attendee } from "../Attendee";
import { Conference, getConference } from "../Conference";
import { Contact, getSessionSpeakers } from "../Contact";
import { IContext } from "../Context";
import { Series } from "../Series";
import series from "./conferenceSeries";
import loadAttendees from "./load-attendees";

@Resolver(_ => Conference)
class ConferenceResolver {
  @Query(_ => Conference)
  public conference(@Arg("id", _ => ID) id: string) {
    return getConference(id);
  }

  // TODO: Deprecate and rename as conferences()
  @Query(_ => [Conference])
  public allConferences() {
    return Object.keys(conferences).map(id => conferences[id]);
  }

  @FieldResolver(_ => Series)
  public series(@Root() conference: Conference) {
    const id = conference.id;

    for (const seriesId of Object.keys(series)) {
      const oneSeries = series[seriesId];
      if (oneSeries.conferences.indexOf(id) !== -1) {
        return oneSeries;
      }
    }

    return;
  }

  @FieldResolver(_ => [Contact])
  public speakers(@Root() conference: Conference) {
    return getSessionSpeakers(conference, conference.talks);
  }

  // TODO: Resolve against CSV based on a convention
  @FieldResolver(_ => [Attendee])
  public attendees(@Root() conference: Conference, @Ctx() ctx: IContext) {
    return loadAttendees(
      conference,
      `${path.join(
        ctx.projectRoot,
        "attendees",
        kebabCase(conference.name)
      )}.csv`
    );
  }
}

export default ConferenceResolver;
