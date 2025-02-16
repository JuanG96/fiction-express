const API_URL = import.meta.env.VITE_API_URL;

export const postMetrics = async (metrics) => {
    const response = await fetch(`${API_URL}/metrics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metrics),
    });
    if (!response.ok) {
      throw new Error("Error al guardar las métricas");
    }
    return response.json();
  };