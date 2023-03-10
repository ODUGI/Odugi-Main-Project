import styled from "styled-components";
import PersonIcon from "../Icons/PersonIcon";
import Text from "../Text/Text";
import DividerVertical from "./DividerVertical";

const FriendHeaderLeft = () => {
  return (
    <FriendHeaderLeftContainer>
      <PersonIcon />
      <Text text="친구" color="white" fontWeight="bold" />
      <DividerVertical mv={8} />
    </FriendHeaderLeftContainer>
  );
};

const FriendHeaderLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  svg {
    color: ${({ theme }) => theme.color["tab3-header"]};
  }
`;

export default FriendHeaderLeft;
