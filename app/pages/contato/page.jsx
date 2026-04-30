"use client";

import { useState } from 'react';
import Header from '@/app/components/header/page';
import Head from '../../components/head/page';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';

export default function Contato() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('');
    setError('');
    setLoading(true);

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
    <>
      <Head />
      <Header />
      <Navbar />

      <div className="flex flex-col items-center py-12 w-full px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center">Contato</h2>
        <p className='text-xl text-center'>Entre em contato com nossa equipe, preencha o formulário abaixo:</p>
        <span className="block mt-2 h-1.5 w-48 bg-[#F29829] rounded-full" />
      </div>

      <div className="w-full px-4 sm:px-6 pb-12">
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto bg-gray-100 p-6 sm:p-8 rounded-lg shadow-md">
          {status && <div className="mb-4 rounded border border-green-400 bg-green-50 px-4 py-3 text-green-800">{status}</div>}
          {error && <div className="mb-4 rounded border border-red-400 bg-red-50 px-4 py-3 text-red-800">{error}</div>}

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold mb-2">Nome</label>
            <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" required />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-bold mb-2">Telefone</label>
            <input type="tel" id="phone" name="phone" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" required />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-bold mb-2">Mensagem</label>
            <textarea id="message" name="message" rows="5" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" required></textarea>
          </div>
          <button type="submit" disabled={loading} className="w-full sm:w-auto bg-[#F29829] text-white px-6 py-2 rounded hover:bg-[#e07b1f] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}