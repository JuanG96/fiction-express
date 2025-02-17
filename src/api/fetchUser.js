const API_URL = import.meta.env.VITE_API_URL;

export const fetchUser = async (username, password) => {
    const response = await fetch(`${API_URL}/users?username=${encodeURIComponent(
      username
    )}&pass=${encodeURIComponent(password)}`
  );
    if (!response.ok) {
      throw new Error("Error al obtener el usuario");
    }
    return response.json();
};