import styled from "@emotion/styled";
import { Color } from "csstype";
import hexToRgba from "hex-to-rgba";
import * as React from "react";
import { Attendee, AttendeeType } from "../../schema/Attendee";
import { Theme } from "../../schema/Theme";
import Card from "../components/Card";

interface BadgeContainerProps {
  width: string;
  height: string;
}

// TODO: Expose dimensions?
const BadgeContainer = styled(Card.Container)`
  display: grid;
  grid-template-rows: repeat(3, 1fr);

  margin: 0;
  padding: 0;
  width: ${({ width }: BadgeContainerProps) => width};
  height: ${({ height }: BadgeContainerProps) => height};

  /* Hole for lanyard */
  &::after {
    position: relative;
    top: -13.7cm;
    left: 50%;
    width: 1mm;
    height: 1mm;
    background: rgba(151, 54, 54, 1);
    border-radius: 50%;
    content: "";
    z-index: 5;
  }
` as React.FC<BadgeContainerProps>;

interface BadgeBaseProps {
  defaultColor: Color;
  type: AttendeeType;
  texture: string;
  opacity?: {
    upper: number;
    lower: number;
  };
}

const BadgeFront = styled(Card.Front)`
  background-image: ${resolveBackground};
  background-size: cover;
` as React.FC<BadgeBaseProps>;
const BadgeBack = styled(Card.Back)`
  background-image: ${resolveBackground};
  background-size: cover;
` as React.FC<BadgeBaseProps>;

function resolveBackground({
  defaultColor = "#000",
  type,
  texture,
  opacity = {
    upper: 1.0,
    lower: 0.6,
  },
}: BadgeBaseProps) {
  const colors = {
    [AttendeeType.ATTENDEE]: defaultColor,
    [AttendeeType.ORGANIZER]: "#6d0b4d",
    [AttendeeType.SPEAKER]: "#d01a1a",
    [AttendeeType.SPONSOR]: "#67d67b",
  };
  const color = colors[type];

  if (!color) {
    console.log("Badge - Missing color");

    return defaultColor;
  }

  return `linear-gradient(${hexToRgba(color, opacity.upper)}, ${hexToRgba(
    color,
    opacity.lower
  )}), url("${texture}")`;
}

const BadgeContent = styled.div`
  margin-left: 0.2cm;
  margin-right: 0.2cm;
  padding: 2cm 0.5cm;
  height: 8.5cm;
  clip-path: polygon(0 0, 100% 0.5cm, 100% 100%, 0 calc(100% - 0.5cm));
  background: ${hexToRgba("#fff", 0.8)};
  z-index: 1;
`;

const BadgeLogo = styled.img`
  margin-top: 0.5em;
`;

const BadgeName = styled.h2`
  display: block;
  font-size: 135%;
`;

const BadgeTwitter = styled.h3`
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 1em;
  font-size: 125%;
`;

const BadgeCompany = styled.p`
  font-weight: bold;
`;

const BadgeType = styled.h3`
  text-transform: capitalize;
  text-align: initial;
  color: white;
  justify-self: start;
  padding-left: 1cm;
`;

interface BadgeProps {
  defaultColor: Color;
  logo: Theme["logos"]["white"]["withText"]["url"];
  attendee: Attendee;
  texture: string;
}

// TODO: Use Image type for logo, not url (string)
function Badge({ defaultColor, logo, texture, attendee }: BadgeProps) {
  if (!attendee) {
    return <>No attendee!</>;
  }

  const { type, name, twitter, company } = attendee;
  const frontContent = (
    <>
      <BadgeLogo src={logo} />
      <BadgeContent>
        <BadgeName>{name}</BadgeName>
        {twitter && <BadgeTwitter>@{twitter}</BadgeTwitter>}
        {company && <BadgeCompany>{company}</BadgeCompany>}
      </BadgeContent>
      {type && <BadgeType>{type}</BadgeType>}
    </>
  );
  // TODO: Expose
  const backContent = frontContent;
  // TODO: Expose
  const width = "10.49cm";
  const height = "14.4cm";

  // TODO: Eliminate BadgeContainer
  return (
    <BadgeContainer width={width} height={height}>
      <BadgeFront defaultColor={defaultColor} texture={texture} type={type}>
        {frontContent}
      </BadgeFront>
      <BadgeBack defaultColor={defaultColor} texture={texture} type={type}>
        {backContent}
      </BadgeBack>
    </BadgeContainer>
  );
}

// TODO: Generate Badge.propTypes based on this structure?
Badge.variables = [
  {
    id: "defaultColor",
    validation: { type: String, default: "#002fa9" },
  },
  {
    id: "logo",
    validation: {
      type: String,
      default: "/media/react-finland/logo/v2/logo-white-with-text.svg",
    },
  },
  {
    id: "attendee",
    validation: {
      type: Attendee,
      default: {
        type: AttendeeType.ATTENDEE,
        name: "John Doe",
        twitter: "johndoe",
        company: "John Doe Co.",
        noPhotography: false,
      },
    },
  },
  {
    id: "texture",
    validation: { type: String, default: "/media/assets/wave.svg" },
  },
];

export default Badge;
