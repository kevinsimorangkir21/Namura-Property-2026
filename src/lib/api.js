export const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

if (typeof window !== "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
    console.warn(
        "[Namura] NEXT_PUBLIC_API_URL is not configured. Using fallback: http://localhost:8080"
    );
}

/**
 * Returns the full URL for an image path.
 * Handles three cases:
 * 1. Absolute URLs (http/https) → use directly
 * 2. Static assets (/Asset/...) → serve from Next.js public folder (use as-is)
 * 3. Uploaded images (uploads/...) → prepend API_URL
 */
export function getImageUrl(path) {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    if (path.startsWith("/Asset")) return path;
    // Remove leading slash for uploads path consistency
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${API_URL}/${cleanPath}`;
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
