"use client";
import { useParams } from "next/navigation";
import ImoveisPorTipo from "@/app/components/imoveis-por-tipo/page";

export default function LocacaoPorTipoPage() {
  const { tipo } = useParams();
  return <ImoveisPorTipo tipoSlug={tipo} finalidade="aluguel" />;
}