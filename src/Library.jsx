import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookImage from "./assets/principito.jpg";
import BookModal from "./components/BookModal";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4444/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <Container>
      <Title>📚 Biblioteca</Title>
      <BookList>
        {books.map((book) => (
          <BookItem key={book.id} onClick={() => handleBookClick(book)}>
            <Image src={BookImage} alt="Book" />
            <BookInfo>
              <BookTitle>{book.title}</BookTitle>
              <BookAuthor>Autor: {book.author}</BookAuthor>
            </BookInfo>
          </BookItem>
        ))}
      </BookList>

      {/* MODAL */}
      {selectedBook && (
        <BookModal
          selectedBook={selectedBook}
          closeModal={closeModal}
        ></BookModal>
      )}
    </Container>
  );
};

export default Library;

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
`;

const Title = styled.h1`
  color: #ff5722;
  font-size: 28px;
`;

const BookList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BookItem = styled.li`
  background: #fff;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 10px 10px 0 0;
`;

const BookInfo = styled.div`
  padding: 10px;
`;

const BookTitle = styled.h3`
  margin: 0;
  color: #4caf50;
`;

const BookAuthor = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: #333;
`;
