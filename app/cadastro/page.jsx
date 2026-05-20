"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header/page";
import Head from "@/app/components/head/page";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { supabase } from "@/app/lib/supabase";
import { BiUser, BiPhone, BiEnvelope, BiCheckCircle, BiLockAlt } from "react-icons/bi";

export default function AcessoCliente() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  
  const [loginData, setLoginData] = useState({ email: "", senha: "" });
  const [cadastroData, setCadastroData] = useState({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
    observacoes: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("clientes")
        .select("id, nome, email, senha")
        .eq("email", loginData.email.trim())
        .eq("senha", loginData.senha)
        .eq("ativo", true)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        localStorage.setItem("alexandria_cliente_id", data.id);
        localStorage.setItem("alexandria_cliente_nome", data.nome);
        setSucesso(true);
        
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 2000);
      } else {
        alert("E-mail ou senha incorretos, ou conta inativa.");
      }
    } catch (error) {
      console.error("Erro no login:", error.message);
      alert("Erro ao realizar o login. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validação básica se e-mail já existe
      const { data: existente } = await supabase
        .from("clientes")
        .select("id")
        .eq("email", cadastroData.email.trim())
        .maybeSingle();

      if (existente) {
        alert("Este e-mail já está cadastrado. Faça o login!");
        setIsLogin(true);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("clientes")
        .insert([
          {
            nome: cadastroData.nome,
            telefone: cadastroData.telefone,
            email: cadastroData.email.trim(),
            senha: cadastroData.senha,
            ativo: true,
            observacoes: cadastroData.observacoes || "Cadastrou-se para favoritar imóveis."
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
          router.refresh();
        }, 2000);
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
          <h1 className="text-4xl font-bold text-center">
            {isLogin ? "Acesse sua Conta" : "Crie sua Conta"}
          </h1>
          <p className="text-gray-600 text-center mt-2 max-w-md">
            {isLogin 
              ? "Faça login para gerenciar seus imóveis favoritos e preferências." 
              : "Cadastre-se para favoritar seus imóveis preferidos e acompanhar as novidades."}
          </p>
          <span className="block mt-3 h-1.5 w-48 bg-[#F29829] rounded-full" />
        </div>

        <div className="w-full max-w-md bg-white border border-gray-300 rounded-3xl shadow-sm p-8">
          {sucesso ? (
            <div className="flex flex-col items-center text-center py-6 space-y-3">
              <BiCheckCircle size={56} className="text-green-500 animate-pulse" />
              <h3 className="text-2xl font-bold">Autenticado com sucesso!</h3>
              <p className="text-gray-600">Bem-vindo à Alexandria. Redirecionando você...</p>
            </div>
          ) : isLogin ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">E-mail</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400"><BiEnvelope size={20} /></div>
                  <input
                    type="email"
                    required
                    placeholder="Seu e-mail cadastrado"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="h-11 w-full rounded-md border border-gray-300 pl-10 pr-3 text-sm outline-none focus:border-[#F29829] focus:ring-1 focus:ring-[#F29829]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Senha</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400"><BiLockAlt size={20} /></div>
                  <input
                    type="password"
                    required
                    placeholder="Sua senha de acesso"
                    value={loginData.senha}
                    onChange={(e) => setLoginData({...loginData, senha: e.target.value})}
                    className="h-11 w-full rounded-md border border-gray-300 pl-10 pr-3 text-sm outline-none focus:border-[#F29829] focus:ring-1 focus:ring-[#F29829]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-2 rounded-md bg-[#F29829] hover:bg-[#1F3445] text-white font-bold uppercase tracking-widest text-sm transition-colors duration-300 disabled:bg-gray-400 cursor-pointer"
              >
                {loading ? "Entrando..." : "Entrar na Conta"}
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Não tem uma conta?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-[#F29829] font-bold hover:underline cursor-pointer bg-transparent border-none outline-none"
                >
                  Cadastre-se aqui
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleCadastro} className="space-y-5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Nome Completo</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400"><BiUser size={20} /></div>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Roberto Jr"
                    value={cadastroData.nome}
                    onChange={(e) => setCadastroData({...cadastroData, nome: e.target.value})}
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
                    value={cadastroData.telefone}
                    onChange={(e) => setCadastroData({...cadastroData, telefone: e.target.value})}
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
                    value={cadastroData.email}
                    onChange={(e) => setCadastroData({...cadastroData, email: e.target.value})}
                    className="h-11 w-full rounded-md border border-gray-300 pl-10 pr-3 text-sm outline-none focus:border-[#F29829] focus:ring-1 focus:ring-[#F29829]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Senha de Acesso</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400"><BiLockAlt size={20} /></div>
                  <input
                    type="password"
                    required
                    placeholder="Crie uma senha segura"
                    value={cadastroData.senha}
                    onChange={(e) => setCadastroData({...cadastroData, senha: e.target.value})}
                    className="h-11 w-full rounded-md border border-gray-300 pl-10 pr-3 text-sm outline-none focus:border-[#F29829] focus:ring-1 focus:ring-[#F29829]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">O que você procura? (Opcional)</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Procuro apartamento de 2 quartos no centro..."
                  value={cadastroData.observacoes}
                  onChange={(e) => setCadastroData({...cadastroData, observacoes: e.target.value})}
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

              <p className="text-center text-sm text-gray-600 mt-4">
                Já possui uma conta?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-[#F29829] font-bold hover:underline cursor-pointer bg-transparent border-none outline-none"
                >
                  Faça login aqui
                </button>
              </p>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}