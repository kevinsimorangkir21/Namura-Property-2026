export const metadata = {
  title: "Login",
  description: "Masuk ke dashboard admin Namura Property.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: "/login",
  },
};

export default function LoginLayout({ children }) {
  return children;
}