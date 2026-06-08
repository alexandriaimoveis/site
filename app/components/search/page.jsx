"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const priceFormatter = (value) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });

export default function Search() {
  const router = useRouter();

  const [dynamicOptions, setDynamicOptions] = useState({
    cidades: [],
    bairros: [],
    tipos: []
  });

  const [filters, setFilters] = useState({
    finalidade: "Venda",
    tipoImovel: "",
    cidade: "",
    bairro: "",
    id: "",
    banheiros: "",
    quartos: "",
    precoMax: 2000000,
  });

  const isAluguel = filters.finalidade === "Aluguel";
  const maxPriceLimit = isAluguel ? 20000 : 5000000;
  const stepLimit = isAluguel ? 100 : 10000;

  useEffect(() => {
    async function loadDynamicOptions() {
      const { data, error } = await supabase
        .from("imoveis")
        .select("cidade, bairro, tipo")
        .eq("status", "disponivel");

      if (error) {
        console.error("Erro ao carregar opções do filtro:", error.message);
        return;
      }

      if (data) {
        const cidadesUnicas = [...new Set(data.map(item => item.cidade).filter(Boolean))].sort();
        const bairrosUnicos = [...new Set(data.map(item => item.bairro).filter(Boolean))].sort();
        const tiposUnicos = [...new Set(data.map(item => item.tipo).filter(Boolean))].sort();

        setDynamicOptions({
          cidades: cidadesUnicas,
          bairros: bairrosUnicos,
          tipos: tiposUnicos
        });
      }
    }

    loadDynamicOptions();
  }, []);

  const handleChange = (field, value) => {
    setFilters((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "finalidade") {
        updated.precoMax = value === "Aluguel" ? 5000 : 2000000;
      }
      return updated;
    });
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (filters.finalidade) params.append("finalidade", filters.finalidade.toLowerCase());
    if (filters.tipoImovel) params.append("tipo", filters.tipoImovel);
    if (filters.cidade) params.append("cidade", filters.cidade);
    if (filters.bairro) params.append("bairro", filters.bairro);
    if (filters.id) params.append("id", filters.id);
    if (filters.quartos) params.append("quartos", filters.quartos);
    if (filters.banheiros) params.append("banheiros", filters.banheiros);
    if (filters.precoMax && filters.precoMax < maxPriceLimit) {
      params.append("precoMax", filters.precoMax.toString());
    }

    router.push(`/pages/resultados?${params.toString()}`);
  };

  return (
    // Fundo neutro e suave para destacar o painel flutuante de busca avançada
    <div className="w-full flex justify-center px-4 py-16 bg-slate-50">
      <div className="w-full max-w-6xl rounded-2xl bg-white px-8 py-10 text-slate-800 shadow-xl border border-slate-100">

        {/* Cabeçalho Interno do Painel */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-extrabold text-center text-slate-800 tracking-tight">
            Busca Avançada
          </h2>
          <span className="block mt-3 h-1 w-24 bg-[#F29829] rounded-full" />
        </div>

        {/* Linha 1 de Filtros */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
          <SelectField
            label="Negócio"
            value={filters.finalidade}
            options={["Venda", "Aluguel"]}
            onChange={(v) => handleChange("finalidade", v)}
          />
          <SelectField
            label="Tipo de imóvel"
            value={filters.tipoImovel}
            options={dynamicOptions.tipos.length > 0 ? dynamicOptions.tipos : ["Casa", "Apartamento", "Terreno"]}
            onChange={(v) => handleChange("tipoImovel", v)}
          />
          <SelectField
            label="Cidade"
            value={filters.cidade}
            options={dynamicOptions.cidades}
            onChange={(v) => handleChange("cidade", v)}
          />
          <SelectField
            label="Bairro"
            value={filters.bairro}
            options={dynamicOptions.bairros}
            onChange={(v) => handleChange("bairro", v)}
          />
          <InputField
            label="Código (ID)"
            placeholder="Ex: 1"
            value={filters.id}
            onChange={(v) => handleChange("id", v)}
          />
        </div>

        {/* Linha 2 de Filtros */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <SelectField
            label="Dormitórios (Quartos)"
            value={filters.quartos}
            options={["1", "2", "3", "4"]}
            onChange={(v) => handleChange("quartos", v)}
          />
          <SelectField
            label="Banheiros"
            value={filters.banheiros}
            options={["1", "2", "3", "4"]}
            onChange={(v) => handleChange("banheiros", v)}
          />
        </div>

        {/* Linha Inferior: Controle de Preço e Ação */}
        <div className="mt-8 flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between border-t border-slate-100 pt-6">
          <div className="w-full md:w-3/4">
            <p className="mb-3 text-center md:text-left text-xs font-bold uppercase tracking-wider text-slate-500">
              Preço Máximo: <span className="text-slate-900 font-extrabold text-sm ml-1">{priceFormatter(filters.precoMax)}</span>
            </p>

            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-slate-400">R$ 0,00</span>
              <input
                type="range"
                min={0}
                max={maxPriceLimit}
                step={stepLimit}
                value={filters.precoMax}
                onChange={(e) =>
                  handleChange("precoMax", Number(e.target.value))
                }
                // Customizado com a cor institucional laranja/ouro
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#F29829] transition-all"
              />
              <span className="text-xs font-medium text-slate-400">{priceFormatter(maxPriceLimit)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSearch}
            // Botão com transição suave que casa com a cor escura premium do restante do site
            className="w-full md:w-auto rounded-xl bg-[#F29829] hover:bg-[#1e293b] text-white px-12 h-12 text-center text-sm font-bold uppercase tracking-widest cursor-pointer shadow-md hover:shadow-lg transition-all duration-300"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:ring-1 focus:ring-[#F29829]"
      >
        <option value="">Todos</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 transition-all focus:border-[#F29829] focus:ring-1 focus:ring-[#F29829]"
      />
    </div>
  );
}