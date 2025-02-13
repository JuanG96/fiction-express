import React from "react";
import styled from "styled-components";
import BookImage from "../assets/principito.jpg";

const BookModal = ({ selectedBook, closeModal }) => {
  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>✖</CloseButton>
        <ModalImage src={BookImage} alt={selectedBook.title} />
        <h2>{selectedBook.title}</h2>
        <p>
          <strong>Autor:</strong> {selectedBook.author}
        </p>
        <p>
          <strong>Descripción:</strong> {selectedBook.description}
        </p>
        <ReadBookButton>Leer libro</ReadBookButton>
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
  background-color: rgba(255, 255, 255, 1);
`;
