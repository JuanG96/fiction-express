import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../AuthContext";
import { fetchBook } from "../api/fetchBook";
import { postMetrics } from "../api/postMetrics";
import CustomText from "./CustomText";

const Reader = ({ onFinishReading, onBookTitle }) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [readingStartTime, setReadingStartTime] = useState(null);
  const [pageEnterTime, setPageEnterTime] = useState(null);
  const [pageTimes, setPageTimes] = useState([]);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await fetchBook(id);
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  useEffect(() => {
    if (book) {
      onBookTitle(book.title);
      const now = Date.now();
      setReadingStartTime(now);
      setPageEnterTime(now);
      setPageTimes(new Array(book.pages.length).fill(0));
    }
  }, [book, onBookTitle]);

  const updateCurrentPageTime = () => {
    const now = Date.now();
    const timeSpent = now - pageEnterTime;
    setPageTimes((prev) => {
      const newTimes = [...prev];
      newTimes[currentPage] += timeSpent;
      return newTimes;
    });
    setPageEnterTime(now);
  };

  const handleNextPage = () => {
    if (book && currentPage < book.pages.length - 1) {
      updateCurrentPageTime();
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      updateCurrentPageTime();
      setCurrentPage((prev) => prev - 1);
    }
  };

  const finishReading = async () => {
    const now = Date.now();
    const lastPageTime = now - pageEnterTime;
    const updatedPageTimes = [...pageTimes];
    updatedPageTimes[currentPage] += lastPageTime;

    const totalTime = now - readingStartTime;
    const sumPageTimes = updatedPageTimes.reduce((acc, t) => acc + t, 0);
    const averageTime = sumPageTimes / book.pages.length;

    const metrics = {
      bookId: book.id,
      userId: user.id,
      totalTime,
      averageTime,
      pageTimes: updatedPageTimes,
    };

    try {
      await postMetrics(metrics);
    } catch (err) {
      console.error("Error saving metrics:", err);
    }

    onFinishReading(metrics);
  };

  if (loading) {
    return (
      <CustomText tag="h1" color="rgba(255, 87, 34, 1)">
        Cargando libro...
      </CustomText>
    );
  }
  if (error) {
    return (
      <CustomText tag="h1" color="rgba(255, 87, 34, 1)">
        {error}
      </CustomText>
    );
  }
  if (!book || !book.pages || book.pages.length === 0) {
    return (
      <CustomText tag="h1" color="rgba(255, 87, 34, 1)">
        El libro no tiene contenido disponible.
      </CustomText>
    );
  }

  return (
    <ReaderContainer>
      <ReaderSubtitle>
        <CustomText tag="h2">
          Página {currentPage + 1} de {book.pages.length}
        </CustomText>
      </ReaderSubtitle>

      <ReaderContent>
        <CustomText fontSize={16} fontWeight={400}>
          {book.pages[currentPage]}
        </CustomText>
      </ReaderContent>

      <ReaderNavigation>
        <NavButton onClick={handlePrevPage} disabled={currentPage === 0}>
          Página anterior
        </NavButton>
        {currentPage === book.pages.length - 1 ? (
          <NavButton onClick={finishReading}>Finalizar lectura</NavButton>
        ) : (
          <NavButton onClick={handleNextPage}>Siguiente página</NavButton>
        )}
      </ReaderNavigation>
    </ReaderContainer>
  );
};

export default Reader;

const ReaderContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReaderSubtitle = styled.div`
  margin-bottom: 1.5rem;
`;

const ReaderContent = styled.div`
  width: 100%;
  max-width: 800px;
  height: 40rem;
  margin-bottom: 2rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  background-color: rgba(249, 249, 249);
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: left;
  font-size: 18px;
  line-height: 1.6;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    height: 50vh;
  }
`;

const ReaderNavigation = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavButton = styled.button`
  font-size: 18px;
  padding: 10px 20px;
  background: rgba(76, 175, 79);
  color: rgba(255, 255, 255);
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background: rgba(170, 170, 170);
    cursor: not-allowed;
  }
`;
