const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(endpoint, options = {}) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.error || "Request failed");
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
}
