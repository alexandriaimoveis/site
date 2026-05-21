"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header/page";
import Head from "../../components/head/page"; 
import Navbar from "../../components/navbar/page"; 
import Footer from "@/app/components/footer/page";
import { supabase } from "@/app/lib/supabase";
import { BiUser, BiPhone, BiEnvelope, BiLockAlt, BiCheckCircle } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function MeuPerfil() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
  });

  useEffect(() => {
    async function carregarPerfil() {
      const clienteId = localStorage.getItem("alexandria_cliente_id");
      const emailSalvo = localStorage.getItem("alexandria_cliente_email");
      
      if (!clienteId) {
        router.push("/cadastro");
        return;
      }

      try {
        const queryId = isNaN(clienteId) ? clienteId : Number(clienteId);

        let query = supabase.from("clientes").select("nome, telefone, email, senha");
        
        if (queryId) {
          query = query.eq("id", queryId);
        } else if (emailSalvo) {
          query = query.eq("email", emailSalvo.trim());
        }

        const { data, error } = await query.maybeSingle();

        if (error) throw error;

        if (data) {
          setFormData({
            nome: data.nome || "",
            telefone: data.telefone || "",
            email: data.email || "",
            senha: data.senha || "",
          });
        } else {
          alert("Aviso: Seus dados cadastrais não foram localizados no banco.");
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error.message);
        alert("Erro ao carregar os dados do seu perfil: " + error.message);
      } finally {
        setLoading(false);
      }
    }

    carregarPerfil();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSalvando(true);
    setSucesso(false);

    const clienteId = localStorage.getItem("alexandria_cliente_id");
    if (!clienteId) {
      alert("Sessão expirada. Faça login novamente.");
      router.push("/cadastro");
      return;
    }

    try {
      const { error, data, status } = await supabase
        .from("clientes")
        .update({
          nome: formData.nome,
          telefone: formData.telefone,
          senha: formData.senha, 
        })
        .eq("email", formData.email.trim())
        .select();

      if (error) throw error;

      if (!data || data.length === 0) {
        alert(`O banco respondeu com status ${status}, mas nenhuma linha foi alterada. Verifique se as políticas de segurança (RLS) da tabela 'clientes' no painel do Supabase permitem a operação de UPDATE.`);
        setSalvando(false);
        return;
      }

      localStorage.setItem("alexandria_cliente_nome", formData.nome);
      setSucesso(true);
      router.refresh();

      setTimeout(() => {
        setSucesso(false);
      }, 3500);

    } catch (error) {
      console.error("Erro detalhado ao atualizar perfil:", error);
      alert("Erro ao atualizar os dados: " + error.message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <Head />
      <Header />
      <Navbar />

      <main className="flex-grow py-16 flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center mb-8 text-center">
          <span className="text-[#F29829] font-bold uppercase tracking-[0.2em] text-xs mb-2 block">
            Configurações
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Meu Perfil</h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-sm sm:max-w-md leading-relaxed">
            Mantenha suas informações de contato e senha sempre atualizadas.
          </p>
          <span className="block mt-4 h-1 w-16 bg-[#F29829] rounded-full" />
        </div>

        <div className="w-full max-w-md bg-white border border-slate-100 rounded-2xl shadow-md p-6 sm:p-8 transition-all duration-300">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <div className="w-8 h-8 border-4 border-[#F29829] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-slate-500 font-medium">Carregando seus dados...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {sucesso && (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm font-semibold transition-all duration-300">
                  <BiCheckCircle size={22} className="text-emerald-600 shrink-0" />
                  <span>Perfil atualizado com sucesso!</span>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Nome Completo</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400"><BiUser size={20} /></div>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Telefone / WhatsApp</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400"><BiPhone size={20} /></div>
                  <input
                    type="text"
                    required
                    placeholder="Seu telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">E-mail (Não alterável)</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400"><BiEnvelope size={20} /></div>
                  <input
                    type="email"
                    disabled
                    value={formData.email}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-100 text-slate-500 pl-11 pr-4 text-sm cursor-not-allowed outline-none select-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Senha de Acesso</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400"><BiLockAlt size={20} /></div>
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    required
                    placeholder="Modifique sua senha se desejar"
                    value={formData.senha}
                    onChange={(e) => setFormData({...formData, senha: e.target.value})}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-11 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829]"
                  />
                  
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 bg-transparent border-none outline-none cursor-pointer flex items-center justify-center p-1 transition-colors"
                    title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {mostrarSenha ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={salvando}
                className="w-full h-12 mt-4 rounded-xl bg-[#F29829] hover:bg-[#1F3445] text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 disabled:bg-slate-300 shadow-sm shadow-[#F29829]/20 cursor-pointer"
              >
                {salvando ? "Salvando..." : "Salvar Alterações"}
              </button>

            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}