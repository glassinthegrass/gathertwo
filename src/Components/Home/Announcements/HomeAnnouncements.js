import React from "react";
import { useHistory } from "react-router";
import {
  AnnouncementContainer,
  LeftArrow,
  RightArrow,
  Title,
  AnnouncementImage,
  GroupName,
  AnnouncementGroup,
} from "./styles";
import styled from "styled-components";

let Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const HomeAnnouncements = (props) => {
  console.log(props);
  const history = useHistory(),
    { push } = history;

  const { announcements, idx, handleIncrement, handleDecrement } = props;

  const announcementUrl = announcements[0]
    ? `https://res.cloudinary.com/glassinthegrass/image/upload/w_780,h_540,c_pad,f_auto/` +
      announcements[idx].announcement_picture_version +
      "/" +
      announcements[idx].announcement_picture_public_id
    : "";

  const groupUrl = announcements[0]
    ? `https://res.cloudinary.com/glassinthegrass/image/upload/w_40,h_40,c_fill,f_auto/` +
      announcements[idx].group_picture_version +
      "/" +
      announcements[idx].group_picture_public_id
    : "";

  let handleAnnouncementClick = () => {
    push(`/announcements/${announcements[idx].announcement_id}`);
  };

  let announcementDisplay = announcements[0] ? (
    <Container>
      <LeftArrow onClick={() => handleDecrement()}>{"<"}</LeftArrow>
      <AnnouncementContainer onClick={handleAnnouncementClick}>
        <AnnouncementImage src={announcementUrl} alt={"announcement pic"} />
        <Title>{announcements[idx].title}</Title>
        <AnnouncementGroup>
          <img src={groupUrl} alt={"group pic"} />
          <GroupName>{announcements[idx].group_name}</GroupName>
        </AnnouncementGroup>
      </AnnouncementContainer>
      <RightArrow onClick={() => handleIncrement()}>{">"}</RightArrow>
    </Container>
  ) : (
    <></>
  );

  return <>{announcementDisplay}</>;
};
export default HomeAnnouncements;
