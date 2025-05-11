import { ChevronLeft } from "lucide-react";

export default function Back() {
  return (
    <button className="text-sm flex items-center gap-1 text-blue-600 cursor-pointer hover:text-blue-500">
      <ChevronLeft size={20} />
      Back
    </button>
  );
}
