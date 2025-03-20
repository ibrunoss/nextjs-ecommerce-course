"use client";
import Image from "next/image";

import { APP_BRAND } from "@/lib/constants/app";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  function goHome() {
    window.location.href = "/";
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Image
        src="/images/logo.svg"
        alt={`${APP_BRAND} logo`}
        width={48}
        height={48}
        priority
      />
      <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Não encontrado</h1>
        <p className="text-destructive">
          Não foi possível localizar a página requisitada
        </p>
        <Button variant="outline" className="mt-4 ml-2" onClick={goHome}>
          Voltar para página inicial
        </Button>
      </div>
    </div>
  );
}
