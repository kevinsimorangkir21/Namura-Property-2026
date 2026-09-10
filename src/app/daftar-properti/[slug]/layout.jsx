const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const SITE_URL = "https://namuraproperty.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${API_URL}/api/properties/slug/${slug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return {
        title: "Properti Tidak Ditemukan",
        description:
          "Properti yang Anda cari tidak ditemukan di Namura Property.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const property = await res.json();

    /*
     * =========================================================
     * IMAGE URL
     * =========================================================
     */
    const imageUrl = property.image
      ? property.image.startsWith("http")
        ? property.image
        : property.image.startsWith("/Asset")
          ? `${SITE_URL}${property.image}`
          : `${API_URL}/${property.image}`
      : `${SITE_URL}/Logo/Namura.png`;

    /*
     * =========================================================
     * PRICE FORMAT
     * =========================================================
     */
    const formatPrice = (price) => {
      if (!price) return "";

      return `Rp ${Number(price).toLocaleString("id-ID")}`;
    };

    /*
     * =========================================================
     * DESCRIPTION
     * =========================================================
     */
    const propertyStatus =
      (property.type || "").toLowerCase() === "jual"
        ? "Dijual"
        : "Disewa";

    const description =
      property.description ||
      `${property.title} - ${formatPrice(
        property.price
      )}. Lokasi: ${
        property.location || "Lampung"
      }. ${propertyStatus} oleh Namura Property.`;

    const shortDescription = description
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160);

    /*
     * =========================================================
     * CANONICAL
     * =========================================================
     */
    const canonicalUrl =
      `${SITE_URL}/daftar-properti/${slug}`;

    /*
     * =========================================================
     * KEYWORDS
     * =========================================================
     */
    const keywords = [
      property.title,
      property.location,
      property.type
        ? `properti ${property.type}`
        : null,
      property.type
        ? `${property.type} properti Lampung`
        : null,
      "Namura Property",
      "properti Lampung",
      "rumah Lampung",
      "properti Bandar Lampung",
    ].filter(Boolean);

    /*
     * =========================================================
     * METADATA
     * =========================================================
     */
    return {
      title: property.title,

      description: shortDescription,

      keywords,

      alternates: {
        canonical: canonicalUrl,
      },

      openGraph: {
        title: `${property.title} | Namura Property`,

        description: shortDescription,

        url: canonicalUrl,

        siteName: "Namura Property",

        locale: "id_ID",

        type: "website",

        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${property.title} - Namura Property`,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",

        title: `${property.title} | Namura Property`,

        description: shortDescription,

        images: [imageUrl],
      },

      robots: {
        index: true,
        follow: true,

        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
    };
  } catch (error) {
    return {
      title: "Daftar Properti | Namura Property",

      description:
        "Temukan rumah, tanah, dan ruko pilihan di Lampung bersama Namura Property.",

      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

export default function PropertySlugLayout({ children }) {
  return children;
}