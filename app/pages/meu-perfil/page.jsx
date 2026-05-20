"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header/page";
import Head from "../../components/head/page"; 
import Navbar from "../../components/navbar/page"; 
import Footer from "@/app/components/footer/page";
import { supabase } from "@/app/lib/supabase";
import { BiUser, BiPhone, BiEnvelope, BiLockAlt, BiCheckCircle } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importação corrigida aqui

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

  // Carrega os dados do cliente ao entrar na página
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

  // Salva as alterações no banco de dados
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
    <>
      <Head />
      <Header />
      <Navbar />

      <main className="min-h-screen py-16 text-black flex flex-col items-center px-4">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-center">Meu Perfil</h1>
          <p className="text-gray-600 text-center mt-2">
            Mantenha suas informações de contato e senha sempre atualizadas.
          </p>
          <span className="block mt-3 h-1.5 w-48 bg-[#F29829] rounded-full" />
        </div>

        <div className="w-full max-w-md bg-white border border-gray-300 rounded-3xl shadow-sm p-8">
          {loading ? (
            <p className="text-center py-6 text-gray-500">Carregando seus dados...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {sucesso && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-300 text-green-800 p-3 rounded-lg text-sm font-semibold">
                  <BiCheckCircle size={20} className="text-green-600" />
                  <span>Perfil atualizado com sucesso!</span>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Nome Completo</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400"><BiUser size={20} /></div>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
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
                    placeholder="Seu telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    className="h-11 w-full rounded-md border border-gray-300 pl-10 pr-3 text-sm outline-none focus:border-[#F29829] focus:ring-1 focus:ring-[#F29829]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 opacity-70">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">E-mail (Não alterável)</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400"><BiEnvelope size={20} /></div>
                  <input
                    type="email"
                    disabled
                    value={formData.email}
                    className="h-11 w-full rounded-md border border-gray-200 bg-gray-100 pl-10 pr-3 text-sm cursor-not-allowed outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Senha de Acesso</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400"><BiLockAlt size={20} /></div>
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    required
                    placeholder="Modifique sua senha se desejar"
                    value={formData.senha}
                    onChange={(e) => setFormData({...formData, senha: e.target.value})}
                    className="h-11 w-full rounded-md border border-gray-300 pl-10 pr-10 text-sm outline-none focus:border-[#F29829] focus:ring-1 focus:ring-[#F29829]"
                  />
                  
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 text-gray-400 hover:text-gray-600 bg-transparent border-none outline-none cursor-pointer flex items-center justify-center p-1"
                    title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {mostrarSenha ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={salvando}
                className="w-full h-12 mt-2 rounded-md bg-[#F29829] hover:bg-[#1F3445] text-white font-bold uppercase tracking-widest text-sm transition-colors duration-300 disabled:bg-gray-400 cursor-pointer"
              >
                {salvando ? "Salvando..." : "Salvar Alterações"}
              </button>

            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}