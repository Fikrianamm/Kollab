import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

interface BackProps {
  onClick?: () => void; // Fungsi custom saat tombol diklik
  label?: string; // Teks label tombol
  iconSize?: number; // Ukuran ikon Chevron
  fallbackPath?: string; // Path default jika tidak ada history
  variant?: "button" | "ghost";
}

export default function Back({
  onClick,
  label = "Back",
  iconSize = 20,
  fallbackPath = "/", // Default ke homepage jika tidak ada history
  variant = "ghost",
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

  if (variant === "button") {
    return (
      <Button
        variant={"outline"}
        onClick={handleClick}
        className="text-sm flex items-center gap-1 cursor-pointer"
      >
        <ChevronLeft size={iconSize} />
        {label}
      </Button>
    );
  }

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
