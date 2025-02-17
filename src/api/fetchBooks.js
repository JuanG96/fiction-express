const API_URL = import.meta.env.VITE_API_URL;

export const fetchBooks = async () => {
    const response = await fetch(`${API_URL}/books/`);
    if (!response.ok) {
      throw new Error("Error al obtener el libro");
    }
    return response.json();
};