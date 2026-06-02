const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const SITE_URL = "https://namuraproperty.com";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const res = await fetch(`${API_URL}/api/properties/slug/${slug}`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            return { title: "Properti Tidak Ditemukan" };
        }

        const property = await res.json();

        const imageUrl = property.image
            ? property.image.startsWith("http")
                ? property.image
                : property.image.startsWith("/Asset")
                    ? `${SITE_URL}${property.image}`
                    : `${API_URL}/${property.image}`
            : `${SITE_URL}/Logo/Namura.png`;

        const formatPrice = (price) =>
            price ? `Rp ${Number(price).toLocaleString("id-ID")}` : "";

        const description =
            property.description ||
            `${property.title} - ${formatPrice(property.price)}. Lokasi: ${property.location}. ${property.type === "jual" ? "Dijual" : "Disewa"} oleh Namura Property.`;

        return {
            title: property.title,
            description: description.slice(0, 160),
            keywords: [
                property.title,
                property.location,
                `properti ${property.type}`,
                "Namura Property",
                "properti Lampung",
            ].filter(Boolean),
            alternates: {
                canonical: `${SITE_URL}/daftar-properti/${slug}`,
            },
            openGraph: {
                title: `${property.title} | Namura Property`,
                description: description.slice(0, 160),
                url: `${SITE_URL}/daftar-properti/${slug}`,
                type: "website",
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: property.title,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: `${property.title} | Namura Property`,
                description: description.slice(0, 160),
                images: [imageUrl],
            },
        };
    } catch {
        return { title: "Daftar Properti" };
    }
}

export default function PropertySlugLayout({ children }) {
    return children;
}
