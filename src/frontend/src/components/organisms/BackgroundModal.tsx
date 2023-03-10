import useModalStore from "@store/useModalStore";
import { flexCenter } from "@styles/flexCenter";
import { ReactElement } from "react";
import styled from "styled-components";
import DefaultModal from "../atoms/Div/DefaultModal";

interface BackgroundModalProps {
  children: ReactElement;
  width: number;
  p: number;
  onClick?: () => void;
}

const BackgroundModal = ({
  children,
  width,
  p,
  onClick,
}: BackgroundModalProps) => {
  const { setShowModal } = useModalStore();

  const closeModal = () => {
    if (onClick) {
      onClick();
    } else {
      setShowModal(false);
    }
  };

  return (
    <BackgroundWrapper onClick={closeModal}>
      <DefaultModal width={width} p={p} onClick={(e) => e.stopPropagation()}>
        {children}
      </DefaultModal>
    </BackgroundWrapper>
  );
};

const BackgroundWrapper = styled.div`
  ${flexCenter}
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
`;

export default BackgroundModal;
