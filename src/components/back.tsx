import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

interface BackProps {
  onClick?: () => void; // Fungsi custom saat tombol diklik
  label?: string; // Teks label tombol
  iconSize?: number; // Ukuran ikon Chevron
  fallbackPath?: string; // Path default jika tidak ada history
}

export default function Back({
  onClick,
  label = "Back",
  iconSize = 20,
  fallbackPath = "/", // Default ke homepage jika tidak ada history
}: BackProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Eksekusi fungsi custom jika disediakan
    } else {
      // Cek apakah ada history untuk kembali
      if (window.history.length > 1) {
        navigate(-1); // Kembali ke halaman sebelumnya menggunakan React Router
      } else {
        // Jika tidak ada history, arahkan ke fallback path
        navigate(fallbackPath);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-sm flex items-center gap-1 text-blue-600 cursor-pointer hover:text-blue-500"
    >
      <ChevronLeft size={iconSize} />
      {label}
    </button>
  );
}
