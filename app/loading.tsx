import Image from "next/image";

import loader from "@/assets/loader.gif";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Image
        src={loader}
        width={150}
        height={150}
        alt="Carregando..."
        unoptimized
      />
    </div>
  );
}
