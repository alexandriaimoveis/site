"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header/page";
import Head from "@/app/components/head/page";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { supabase } from "@/app/lib/supabase";
import { BiUser, BiPhone, BiEnvelope, BiCheckCircle } from "react-icons/bi";

export default function CadastroCliente() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    observacoes: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("clientes")
        .insert([
          {
            nome: formData.nome,
            telefone: formData.telefone,
            email: formData.email,
            ativo: true,
            observacoes: formData.observacoes || "Cadastrou-se para favoritar imóveis."
          }
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        localStorage.setItem("alexandria_cliente_id", data.id);
        localStorage.setItem("alexandria_cliente_nome", data.nome);
        setSucesso(true);
        
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error.message);
      alert("Erro ao realizar cadastro. Verifique os dados ou tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head />
      <Header />
      <Navbar />

      <main className="min-h-screen bg-gray-100 py-16 text-black flex flex-col items-center px-4">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-center">Crie sua Conta</h1>
          <p className="text-gray-600 text-center mt-2">
            Cadastre-se para favoritar seus imóveis preferidos e acompanhar as novidades.
          </p>
          <span className="block mt-3 h-1.5 w-48 bg-[#F29829] rounded-full" />
        </div>

        <div className="w-full max-w-md bg-white border border-gray-300 rounded-3xl shadow-sm p-8">
          {sucesso ? (
            <div className="flex flex-col items-center text-center py-6 space-y-3">
              <BiCheckCircle size={56} className="text-green-500 animate-pulse" />
              <h3 className="text-2xl font-bold">Cadastro Concluído!</h3>
              <p className="text-gray-600">Bem-vindo à Alexandria. Redirecionando você...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Nome Completo</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400"><BiUser size={20} /></div>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Roberto Jr"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="h-11 w-full rounded-md border border-gray-300 pl-10 pr-3 text-sm outline-none focus:border-[#F29829] focus:ring-1 focus:ring-[#F29829]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Telefone / WhatsApp</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400"><BiPhone size={20} /></div>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 35123456789"
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    className="h-11 w-full rounded-md border border-gray-300 pl-10 pr-3 text-sm outline-none focus:border-[#F29829] focus:ring-1 focus:ring-[#F29829]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">E-mail</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400"><BiEnvelope size={20} /></div>
                  <input
                    type="email"
                    required
                    placeholder="Ex: robertocarlos@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="h-11 w-full rounded-md border border-gray-300 pl-10 pr-3 text-sm outline-none focus:border-[#F29829] focus:ring-1 focus:ring-[#F29829]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">O que você procura? (Opcional)</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Procuro apartamento de 2 quartos no centro..."
                  value={formData.observacoes}
                  onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                  className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:border-[#F29829] focus:ring-1 focus:ring-[#F29829]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-2 rounded-md bg-[#F29829] hover:bg-[#1F3445] text-white font-bold uppercase tracking-widest text-sm transition-colors duration-300 disabled:bg-gray-400 cursor-pointer"
              >
                {loading ? "Cadastrando..." : "Criar Minha Conta"}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}