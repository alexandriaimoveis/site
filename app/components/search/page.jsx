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
    if (filters.precoMax) params.append("precoMax", filters.precoMax.toString());

    router.push(`/pages/resultados?${params.toString()}`);
  };

  return (
    <div className="w-full flex justify-center px-4 py-12">
      <div className="w-full max-w-6xl rounded-xl bg-white px-6 py-6 text-black">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-bold text-center">Busca Avançada</h2>
          <span className="block mt-2 h-1.5 w-48 bg-[#F29829] rounded-full" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
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

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
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

        <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:w-3/4">
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.15em] text-gray-600">
              Preço Máximo: <span className="font-bold text-gray-900">{priceFormatter(filters.precoMax)}</span>
            </p>

            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">R$ 0,00</span>
              <input
                type="range"
                min={0}
                max={maxPriceLimit}
                step={stepLimit}
                value={filters.precoMax}
                onChange={(e) =>
                  handleChange("precoMax", Number(e.target.value))
                }
                className="h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-sky-600"
              />
              <span className="text-xs text-gray-500">{priceFormatter(maxPriceLimit)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="w-full md:w-auto rounded-md bg-[#F29829] hover:bg-[#1F3445] hover:text-white px-10 py-3 text-center text-sm font-semibold uppercase tracking-widest cursor-pointer ease-in-out duration-300"
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
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-600">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm text-gray-900 outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
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
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-600">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
      />
    </div>
  );
}