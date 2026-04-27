export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white to-blue-50 dark:from-[#0e1117] dark:to-[#101826] text-gray-600 dark:text-gray-300 pt-16 pb-12">
      {/* Wave SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-full h-16 md:h-24 text-blue-100 dark:text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.45,168.19-17.48,250.45-0.39,59,12.27,113.79,31.89,172,47.78,82.62,22.51,168.38,31.15,250.61,13.69V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.svg" alt="MagangHub" className="w-9 h-9" />
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              MagangHub
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Portal resmi <strong>MagangHub</strong> — wadah kolaborasi antara dunia pendidikan
            dan industri untuk meningkatkan kompetensi tenaga kerja muda Indonesia.
          </p>
          <p className="text-sm mt-4">
            <strong>Alamat:</strong> Jl. Gatot Subroto Kav. 51, Jakarta Selatan
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Navigasi
          </h4>
          <ul className="space-y-2 text-sm">
            {["Beranda", "Lowongan Magang", "Alur Pendaftaran", "Tentang", "Bantuan"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Terhubung
          </h4>
          <p className="text-sm mb-4">
            Ikuti kami di media sosial untuk informasi terbaru tentang magang dan karier.
          </p>
          <div className="flex gap-4">
            {[
              { icon: "twitter", url: "https://twitter.com" },
              { icon: "linkedin", url: "https://linkedin.com" },
              { icon: "instagram", url: "https://instagram.com" },
              { icon: "youtube", url: "https://youtube.com" },
            ].map(({ icon, url }) => (
              <a
                key={icon}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all duration-300"
              >
                <i className={`bi bi-${icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2025 <strong>MagangHub</strong> — Kementerian Ketenagakerjaan Republik Indonesia.<br />
        Semua hak cipta dilindungi.
      </div>

      {/* Floating gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-100/20 to-transparent dark:from-blue-900/10 pointer-events-none"></div>
    </footer>
  );
}
