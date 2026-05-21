"use client";

import { useState } from 'react';
import Header from '@/app/components/header/page';
import Head from '../../components/head/page';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import { BsCheckCircleFill, BsXCircleFill, BsTelephoneFill, BsEnvelopeFill, BsClockFill } from 'react-icons/bs';

export default function Contato() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('');
    setError('');
    loading || setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      message: formData.get('message')?.toString() || '',
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao enviar mensagem.');
      }

      setStatus(result.message || 'Mensagem enviada com sucesso!');
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <div>
        <Head />
        <Header />
        <Navbar />

        <section className="bg-white border-b border-slate-100 py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-[#F29829] font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
              Canais de Atendimento
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Fale Conosco
            </h1>
            <p className="text-sm text-slate-500 font-medium max-w-md mx-auto mt-2">
              Tem alguma dúvida ou quer agendar uma visita? Escolha um canal ou preencha o formulário abaixo.
            </p>
            <span className="block mt-4 h-1 w-16 bg-[#F29829] rounded-full mx-auto" />
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#F29829]">
                  <BsTelephoneFill size={16} />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Telefone & WhatsApp</h3>
                  <p className="text-slate-600 text-sm mt-1 font-semibold">+55 (35) 9 8713-1293</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#F29829]">
                  <BsEnvelopeFill size={16} />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">E-mail Corporativo</h3>
                  <p className="text-slate-600 text-sm mt-1 font-semibold">alexandriaimoveis@gmail.com</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#F29829]">
                  <BsClockFill size={16} />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Horário de Funcionamento</h3>
                  <p className="text-slate-600 text-sm mt-1">Segunda a Sexta: 09h às 18h<br />Sábado: 09h às 13h</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="w-full bg-white border border-slate-100 p-8 sm:p-10 rounded-2xl shadow-md space-y-6">
                
                {status && (
                  <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3.5 text-sm font-semibold text-emerald-800">
                    <BsCheckCircleFill className="shrink-0 text-emerald-600" size={18} />
                    <span>{status}</span>
                  </div>
                )}
                {error && (
                  <div className="flex items-center gap-3 rounded-xl bg-rose-50 border border-rose-100 px-4 py-3.5 text-sm font-semibold text-rose-800">
                    <BsXCircleFill className="shrink-0 text-rose-600" size={18} />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Nome Completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e293b] focus:ring-4 focus:ring-[#1e293b]/5 transition-all duration-200 font-medium text-sm" 
                    placeholder="Digite seu nome"
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">E-mail</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e293b] focus:ring-4 focus:ring-[#1e293b]/5 transition-all duration-200 font-medium text-sm" 
                      placeholder="seu@email.com"
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Telefone / WhatsApp</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e293b] focus:ring-4 focus:ring-[#1e293b]/5 transition-all duration-200 font-medium text-sm" 
                      placeholder="(35) 99999-9999"
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Como podemos ajudar?</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="4" 
                    className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e293b] focus:ring-4 focus:ring-[#1e293b]/5 transition-all duration-200 font-medium text-sm resize-none" 
                    placeholder="Descreva brevemente o que você procura..."
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full sm:w-auto bg-[#F29829] text-white font-extrabold uppercase tracking-widest text-[11px] px-8 py-3.5 rounded-full shadow-md hover:bg-[#1e293b] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    'Enviar Mensagem'
                  )}
                </button>
              </form>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}