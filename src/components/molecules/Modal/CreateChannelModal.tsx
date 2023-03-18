import styled from "styled-components";
import useInput from "@hooks/common/useInput";
import DefaultInput from "@components/atoms/Input/DefaultInput";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "@store/useUserStore";
import { useState } from "react";
import communityApi from "@api/community";
import CreateCommunityText from "@components/molecules/Text/CreateCommunityText";
import BackgroundModal from "@components/organisms/BackgroundModal";
import ImageUploadButton from "@components/molecules/Button/ImageUploadButton";
import DefaultButton from "@components/atoms/Button/DefaultButton";
import CancelIcon from "@components/atoms/Icons/CancelIcon";
import useModalStore from "@store/useModalStore";
import Text from "@components/atoms/Text/Text";

const CreateChannelModal = () => {
  const navigate = useNavigate();

  let formData = new FormData();

  const { userInfo } = useUserStore();
  const { setShowModal } = useModalStore();
  const [name, changeName] = useInput();
  const [type, setType] = useState<string>();
  const [role, setRole] = useState();
  //userInfo에 role이 없었던가?
  const [categoryId, setCategoryId] = useState();
  const { mutate: createChannel } = useMutation(communityApi.createChannel, {
    onSuccess: () => {
      navigate(-1);
    },
  });

  const MakeChannel = () => {
    createChannel({ name, categoryId, type, role });
    navigate(-1);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  return (
    <BackgroundModal width={440} p={0}>
      <>
        <CreateCommunityHeader>
          <CancelIconWrapper onClick={closeModal}>
            <CancelIcon />
          </CancelIconWrapper>
          <CreateCommunityText />
        </CreateCommunityHeader>
        <CreateCommunityBody>
          <Text text="채널 이름" fontSize="xs" color="white" mb={8} />
          <p>
            <input
              type="radio"
              name="채팅채널"
              value="chat"
              id="chat"
              onChange={radioHandler}
            />
            <label htmlFor="coffee">채팅채널</label>
          </p>

          <p>
            <input
              type="radio"
              name="drink"
              value="talk"
              id="talk"
              onChange={radioHandler}
            />
            <label htmlFor="tea">음성채널</label>
          </p>
          <DefaultInput value={name} onChange={changeName} type="text" />
        </CreateCommunityBody>
        <CreateCommunityFooter>
          <DefaultButton
            width={96}
            height={38}
            text="취소"
            backgroundColor="transparernt"
            hoverBackgroundColor="transparent"
            onClick={closeModal}
          />
          <DefaultButton
            width={96}
            height={38}
            text="만들기"
            onClick={MakeChannel}
          />
        </CreateCommunityFooter>
      </>
    </BackgroundModal>
  );
};

const CreateCommunityHeader = styled.div`
  padding: 1.5rem 1.5rem 0;
`;

const CancelIconWrapper = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.color.icon};

  display: flex;
  justify-content: end;

  cursor: pointer;
`;

const CreateCommunityBody = styled.div`
  margin: 1rem 0;
  padding: 0 0.5rem 0 1rem;
`;

const CreateCommunityFooter = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.backgroundColor["grey-7"]};

  display: flex;
  justify-content: space-between;
`;

export default CreateChannelModal;
