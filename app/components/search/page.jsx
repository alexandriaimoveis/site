"use client";

import { useState } from "react";

const priceFormatter = (value) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });

const options = {
  negocio: ["Venda", "Aluguel"],
  tipoImovel: ["Apartamento", "Casa", "Cobertura", "Terreno", "Sala comercial"],
  cidade: ["Passa Quatro", "São Lourenço", "Itanhandu", "Pouso Alegre"],
  bairro: ["Centro", "Bairro 1", "Bairro 2", "Zona Rural"],
  codigo: ["Código específico"],
  categoria: ["Residencial", "Comercial", "Rural", "Lançamento"],
  caracteristicas: [
    "Mobiliado",
    "Área gourmet",
    "Piscina",
    "Portaria 24h",
    "Academia",
  ],
  banheiros: ["1+", "2+", "3+", "4+"],
  dormitorios: ["1+", "2+", "3+", "4+"],

  suites: ["0", "1+", "2+", "3+"],
  vagas: ["0", "1+", "2+", "3+", "4+"],
  condominios: ["Com condomínio", "Sem condomínio"],
};

export default function Search() {
  const [filters, setFilters] = useState({
    negocio: "Venda",
    tipoImovel: "",
    cidade: "",
    bairro: "",
    codigo: "",
    categoria: "",
    caracteristicas: "",
    banheiros: "",
    dormitorios: "",
    suites: "",
    vagas: "",
    condominios: "",
    precoMin: 50000,
    precoMax: 15000000,
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    console.log("Filtros:", filters);
  };

  return (
    <div className="w-full flex justify-center px-4 py-12">
      <div className="w-full max-w-6xl rounded-xl bg-white px-6 py-6 text-black">
        <h2 className="text-2xl font-bold text-center pb-8">Busca Avançada</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <SelectField
            label="Negócio"
            value={filters.negocio}
            options={options.negocio}
            onChange={(v) => handleChange("negocio", v)}
          />
          <SelectField
            label="Tipo de imóvel"
            value={filters.tipoImovel}
            options={options.tipoImovel}
            onChange={(v) => handleChange("tipoImovel", v)}
          />
          <SelectField
            label="Cidade"
            value={filters.cidade}
            options={options.cidade}
            onChange={(v) => handleChange("cidade", v)}
          />
          <SelectField
            label="Bairro"
            value={filters.bairro}
            options={options.bairro}
            onChange={(v) => handleChange("bairro", v)}
          />
          <InputField
            label="Código"
            placeholder="Ex: 1234"
            value={filters.codigo}
            onChange={(v) => handleChange("codigo", v)}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
          <SelectField
            label="Categoria"
            value={filters.categoria}
            options={options.categoria}
            onChange={(v) => handleChange("categoria", v)}
          />
          <SelectField
            label="Características"
            value={filters.caracteristicas}
            options={options.caracteristicas}
            onChange={(v) => handleChange("caracteristicas", v)}
          />
          <SelectField
            label="Banheiros"
            value={filters.banheiros}
            options={options.banheiros}
            onChange={(v) => handleChange("banheiros", v)}
          />
          <SelectField
            label="Dormitórios"
            value={filters.dormitorios}
            options={options.dormitorios}
            onChange={(v) => handleChange("dormitorios", v)}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <SelectField
            label="Suítes"
            value={filters.suites}
            options={options.suites}
            onChange={(v) => handleChange("suites", v)}
          />
          <SelectField
            label="Vagas"
            value={filters.vagas}
            options={options.vagas}
            onChange={(v) => handleChange("vagas", v)}
          />
          <SelectField
            label="Condomínios"
            value={filters.condominios}
            options={options.condominios}
            onChange={(v) => handleChange("condominios", v)}
          />
        </div>

        <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:w-3/4">
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.15em] text-gray-600">
              Preços
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="w-24 text-xs text-gray-700">
                  {priceFormatter(filters.precoMin)}
                </span>
                <input
                  type="range"
                  min={50000}
                  max={15000000}
                  step={10000}
                  value={filters.precoMin}
                  onChange={(e) =>
                    handleChange("precoMin", Number(e.target.value))
                  }
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-sky-600"
                />
                <span className="w-28 text-xs text-right text-gray-700">
                  {priceFormatter(filters.precoMax)}
                </span>
              </div>
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
        <option value="">Selecionar</option>
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
