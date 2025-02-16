import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BookImage from "../assets/book.jpg";
import CustomText from "./CustomText";

const BookModal = ({ selectedBook, closeModal }) => {
  const navigate = useNavigate();

  const handleRead = () => {
    closeModal();
    navigate(`/read-book/${selectedBook.id}`);
  };

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>✖</CloseButton>
        <ModalImage src={BookImage} alt={selectedBook.title} />
        <BookInfoContainer>
          <CustomText tag="h2">{selectedBook.title}</CustomText>
          <CustomText tag="p">
            <strong>Autor:</strong> {selectedBook.author}
          </CustomText>
          <CustomText tag="p">
            <strong>Descripción:</strong> {selectedBook.description}
          </CustomText>
          <ReadBookButton onClick={handleRead}>Leer libro</ReadBookButton>
        </BookInfoContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BookModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  max-width: 400px;
  width: 90%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 250px;
  object-fit: contain;
  margin-bottom: 10px;
`;

const ReadBookButton = styled.button`
  cursor: pointer;
  font-size: 20px;
  border: 1px solid rgba(197, 197, 197, 1);
  border-radius: 8px;
  padding: 0.4rem 1rem;
  margin-top: 1rem;
  background-color: rgba(250, 250, 250, 1);
`;

const BookInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
