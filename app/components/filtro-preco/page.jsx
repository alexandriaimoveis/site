"use client";
import { useMemo, useState, useEffect } from "react"; 
import { BiFilterAlt } from "react-icons/bi";

const FAIXAS_VENDA = [
  { label: "Todos os preços", min: 0, max: Infinity },
  { label: "Até R$ 200 mil", min: 0, max: 200000 },
  { label: "R$ 200 mil – R$ 400 mil", min: 200000, max: 400000 },
  { label: "R$ 400 mil – R$ 600 mil", min: 400000, max: 600000 },
  { label: "R$ 600 mil – R$ 1 milhão", min: 600000, max: 1000000 },
  { label: "Acima de R$ 1 milhão", min: 1000000, max: Infinity },
];

const FAIXAS_ALUGUEL = [
  { label: "Todos os preços", min: 0, max: Infinity },
  { label: "Até R$ 1.000", min: 0, max: 1000 },
  { label: "R$ 1.000 – R$ 2.000", min: 1000, max: 2000 },
  { label: "R$ 2.000 – R$ 3.500", min: 2000, max: 3500 },
  { label: "R$ 3.500 – R$ 5.000", min: 3500, max: 5000 },
  { label: "Acima de R$ 5.000", min: 5000, max: Infinity },
];

export function useFiltroPreco(imoveis, tipoPreco = "venda") {
  const [ordenacao, setOrdenacao] = useState("desc");
  const [faixaIndex, setFaixaIndex] = useState(0);

  const faixas = tipoPreco === "aluguel" ? FAIXAS_ALUGUEL : FAIXAS_VENDA;

  const getPreco = (imovel) => {
    if (tipoPreco === "aluguel") return Number(imovel.preco_aluguel) || 0;
    return Number(imovel.preco_venda) || 0;
  };

  const imoveisFiltrados = useMemo(() => {
    const faixa = faixas[faixaIndex] || faixas[0];

    const filtrados = imoveis.filter((imovel) => {
      const preco = getPreco(imovel);
      return preco >= faixa.min && preco <= faixa.max;
    });

    return [...filtrados].sort((a, b) => {
      const precoA = getPreco(a);
      const precoB = getPreco(b);
      return ordenacao === "desc" ? precoB - precoA : precoA - precoB;
    });
  }, [imoveis, faixaIndex, ordenacao, tipoPreco]);

  useEffect(() => {
    setFaixaIndex(0);
  }, [tipoPreco]);

  return {
    imoveisFiltrados,
    faixas,
    faixaIndex,
    setFaixaIndex,
    ordenacao,
    setOrdenacao,
  };
}

export default function FiltroPreco({ faixas = [], faixaIndex = 0, setFaixaIndex, ordenacao, setOrdenacao }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto mt-8 px-6">
      <div className="flex items-center gap-2 text-slate-400">
        <BiFilterAlt size={16} />
        <span className="text-[11px] font-bold uppercase tracking-wider hidden sm:inline">Filtrar por:</span>
      </div>

      <select
        value={faixaIndex}
        onChange={(e) => setFaixaIndex?.(Number(e.target.value))}
        className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-slate-200 bg-white text-xs font-bold uppercase tracking-wider text-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F29829]/40 cursor-pointer hover:border-[#F29829]/50 transition-colors"
      >
        {faixas.map((faixa, index) => (
          <option key={faixa.label} value={index}>
            {faixa.label}
          </option>
        ))}
      </select>

      <select
        value={ordenacao}
        onChange={(e) => setOrdenacao?.(e.target.value)}
        className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-slate-200 bg-white text-xs font-bold uppercase tracking-wider text-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F29829]/40 cursor-pointer hover:border-[#F29829]/50 transition-colors"
      >
        <option value="desc">Maior preço primeiro</option>
        <option value="asc">Menor preço primeiro</option>
      </select>
    </div>
  );
}