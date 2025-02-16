const API_URL = import.meta.env.VITE_API_URL;

export const fetchBook = async (id) => {
    const response = await fetch(`${API_URL}/books/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener el libro");
    }
    return response.json();
};