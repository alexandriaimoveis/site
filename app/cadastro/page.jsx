"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header/page";
import Head from "@/app/components/head/page";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { supabase } from "@/app/lib/supabase";
import { BiUser, BiPhone, BiEnvelope, BiCheckCircle, BiLockAlt, BiMessageDetail } from "react-icons/bi";

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
    loading ? null : setLoading(true);

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
    loading ? null : setLoading(true);

    try {
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
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <Head />
      <Header />
      <Navbar />

      <main className="flex-grow py-16 flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center mb-8 text-center">
          <span className="text-[#F29829] font-bold uppercase tracking-[0.2em] text-xs mb-2 block">
            Área do Cliente
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isLogin ? "Acesse sua Conta" : "Crie sua Conta"}
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-sm sm:max-w-md leading-relaxed">
            {isLogin 
              ? "Faça login para gerenciar seus imóveis favoritos e preferências." 
              : "Cadastre-se para favoritar seus imóveis preferidos e acompanhar as novidades."}
          </p>
          <span className="block mt-4 h-1 w-16 bg-[#F29829] rounded-full" />
        </div>

        <div className="w-full max-w-md bg-white border border-slate-100 rounded-2xl shadow-md p-6 sm:p-8 transition-all duration-300">
          
          {sucesso ? (
            <div className="flex flex-col items-center text-center py-8 space-y-4">
              <div className="bg-emerald-50 p-4 rounded-full text-emerald-500 animate-bounce">
                <BiCheckCircle size={48} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Autenticado com sucesso!</h3>
              <p className="text-slate-500 text-sm">
                Bem-vindo à Alexandria Imobiliária.<br />Redirecionando para a página principal...
              </p>
            </div>
          ) : (
            <>
              <div className="flex bg-slate-100 p-1.5 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
                    isLogin 
                      ? "bg-white text-[#1F3445] shadow-sm" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Entrar
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
                    !isLogin 
                      ? "bg-white text-[#1F3445] shadow-sm" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Cadastrar
                </button>
              </div>

              {isLogin ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">E-mail</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 text-slate-400"><BiEnvelope size={20} /></div>
                      <input
                        type="email"
                        required
                        placeholder="Seu e-mail cadastrado"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Senha</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 text-slate-400"><BiLockAlt size={20} /></div>
                      <input
                        type="password"
                        required
                        placeholder="Sua senha de acesso"
                        value={loginData.senha}
                        onChange={(e) => setLoginData({...loginData, senha: e.target.value})}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 mt-4 rounded-xl bg-[#F29829] hover:bg-[#1F3445] text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 disabled:bg-slate-300 shadow-sm shadow-[#F29829]/20 cursor-pointer"
                  >
                    {loading ? "Entrando..." : "Entrar na Conta"}
                  </button>

                  <p className="text-center text-xs sm:text-sm text-slate-500 mt-4">
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
                <form onSubmit={handleCadastro} className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Nome Completo</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 text-slate-400"><BiUser size={20} /></div>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Roberto Júnior"
                        value={cadastroData.nome}
                        onChange={(e) => setCadastroData({...cadastroData, nome: e.target.value})}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Telefone / WhatsApp</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 text-slate-400"><BiPhone size={20} /></div>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: 35 91234-5678"
                        value={cadastroData.telefone}
                        onChange={(e) => setCadastroData({...cadastroData, telefone: e.target.value})}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">E-mail</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 text-slate-400"><BiEnvelope size={20} /></div>
                      <input
                        type="email"
                        required
                        placeholder="Ex: robertocarlos@gmail.com"
                        value={cadastroData.email}
                        onChange={(e) => setCadastroData({...cadastroData, email: e.target.value})}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Senha de Acesso</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 text-slate-400"><BiLockAlt size={20} /></div>
                      <input
                        type="password"
                        required
                        placeholder="Crie uma senha segura"
                        value={cadastroData.senha}
                        onChange={(e) => setCadastroData({...cadastroData, senha: e.target.value})}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">O que você procura? (Opcional)</label>
                    <div className="relative flex items-start">
                      <div className="absolute left-3.5 top-3.5 text-slate-400"><BiMessageDetail size={20} /></div>
                      <textarea
                        rows={2}
                        placeholder="Ex: Procuro apartamento de 2 quartos no Centro..."
                        value={cadastroData.observacoes}
                        onChange={(e) => setCadastroData({...cadastroData, observacoes: e.target.value})}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829] resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 mt-4 rounded-xl bg-[#F29829] hover:bg-[#1F3445] text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 disabled:bg-slate-300 shadow-sm shadow-[#F29829]/20 cursor-pointer"
                  >
                    {loading ? "Cadastrando..." : "Criar Minha Conta"}
                  </button>

                  <p className="text-center text-xs sm:text-sm text-slate-500 mt-4">
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
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}