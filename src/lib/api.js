export const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

if (typeof window !== "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
    console.warn(
        "[Namura] NEXT_PUBLIC_API_URL is not configured. Using fallback: http://localhost:8080"
    );
}

/**
 * Returns the full URL for an image path from the API.
 * Handles absolute URLs, relative paths, and null values.
 */
export function getImageUrl(path) {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${API_URL}/${path}`;
}

/**
 * Centralized fetch helper that auto-attaches JWT token
 * and handles error responses consistently.
 */
export async function apiFetch(endpoint, options = {}) {
    if (!API_URL || API_URL === "undefined") {
        throw new Error("API URL is not configured.");
    }

    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

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
