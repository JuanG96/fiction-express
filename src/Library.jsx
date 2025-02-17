import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchBooks } from "./api/fetchBooks";
import BookImage from "./assets/book.jpg";
import BookModal from "./components/BookModal";
import CustomText from "./components/CustomText";

const API_URL = import.meta.env.VITE_API_URL;

const Library = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks();
      console.log({ data });
      setBooks(data);
    };
    loadBooks();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <Container>
      <CustomText tag="h1">📚 Biblioteca</CustomText>
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

      {selectedBook && (
        <BookModal selectedBook={selectedBook} closeModal={closeModal} />
      )}
    </Container>
  );
};

export default Library;

const Container = styled.div`
  margin: 3rem auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookList = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 0;
  margin-top: 2rem;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const BookItem = styled.div`
  background: rgba(255, 255, 255, 1);
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
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
  color: rgba(76, 175, 79, 1);
`;

const BookAuthor = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: rgba(51, 51, 51, 1);
`;
