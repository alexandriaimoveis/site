"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import Header from "@/app/components/header/page";
import Head from "@/app/components/head/page";
import Footer from "@/app/components/footer/page";
import Navbar from "@/app/components/navbar/page";
import { BiBuildings, BiCheckCircle, BiTrash, BiImageAdd } from "react-icons/bi";

export default function EnviarImovel() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [form, setForm] = useState({
    titulo: "", preco_venda: "", descricao: "",
    tipo: "casa", finalidade: "venda", cep: "",
    logradouro: "", bairro: "", cidade: "São Lourenço", estado: "MG"
  });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("Adicione pelo menos uma foto.");
    setLoading(true);

    const clienteId = localStorage.getItem("alexandria_cliente_id");

    try {
      const { data: imovel, error: imovelError } = await supabase
        .from("imoveis")
        .insert([{
          ...form,
          status: "analise",
          proprietario_id: Number(clienteId),
          codigo: `IMO-${Math.floor(Math.random() * 900000) + 100000}`
        }])
        .select()
        .single();

      if (imovelError) throw imovelError;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${imovel.id}/${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("imoveis")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("imoveis")
          .getPublicUrl(fileName);
        
        const { error: imgError } = await supabase
          .from("imovel_imagens")
          .insert([{
            imovel_id: imovel.id, 
            url: publicUrl, 
            ordem: i, 
            capa: i === 0 
          }]);
        
        if (imgError) throw imgError;
      }

      setSucesso(true);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head /> <Header /> <Navbar />

      <div className="flex flex-col items-center py-16">
        <h2 className="text-4xl font-bold text-center">Enviar Imóvel</h2>
        <p className="text-xl font-bold text-center text-gray-600 mt-2">Envie seu imóvel para venda ou locação</p>
        <span className="block mt-2 h-1.5 w-48 bg-[#F29829] rounded-full" />
      </div>

      <main className="min-h-screen px-4">

        <div className="w-full max-w-2xl mx-auto bg-white border border-gray-300 rounded-3xl shadow-sm p-8">
                    
          {sucesso ? (
            <div className="text-center py-10 space-y-4">
              <BiCheckCircle size={60} className="text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold">Enviado com Sucesso!</h2>
              <p>Seu imóvel está em análise pela nossa equipe.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input label="Título" value={form.titulo} onChange={(v) => setForm({...form, titulo: v})} />
              
              <div className="grid grid-cols-2 gap-4">
                <Input label="Preço (R$)" type="number" value={form.preco_venda} onChange={(v) => setForm({...form, preco_venda: v})} />
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase text-gray-600">Tipo</label>
                  <select className="h-11 border border-gray-300 rounded-md px-3" onChange={(e) => setForm({...form, tipo: e.target.value})}>
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                  </select>
                </div>
              </div>

              <Input label="Logradouro" value={form.logradouro} onChange={(v) => setForm({...form, logradouro: v})} />
              
              <div className="grid grid-cols-2 gap-4">
                <Input label="Bairro" value={form.bairro} onChange={(v) => setForm({...form, bairro: v})} />
                <Input label="CEP" type="number" value={form.cep} onChange={(v) => setForm({...form, cep: v})} />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase text-gray-600">Descrição</label>
                <textarea rows={4} className="w-full border border-gray-300 rounded-md p-3" onChange={(e) => setForm({...form, descricao: e.target.value})} />
              </div>

              <div className="pt-4">
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">Fotos do Imóvel</label>
                <div className="flex flex-wrap gap-3">
                  {previews.map((url, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <img src={url} className="w-full h-full object-cover rounded-md" alt="preview" />
                      <button type="button" onClick={() => removeFile(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><BiTrash size={14}/></button>
                    </div>
                  ))}
                  <label className="w-20 h-20 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#F29829] rounded-md">
                    <BiImageAdd size={24} className="text-gray-400" />
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              </div>

              <button disabled={loading} className="w-full h-12 bg-[#F29829] hover:bg-[#1F3445] text-white font-bold uppercase tracking-widest rounded-md transition duration-300">
                {loading ? "Enviando..." : "Enviar Imóvel"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase text-gray-600">{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className="h-11 w-full rounded-md border border-gray-300 px-3 outline-none focus:border-[#F29829] focus:ring-1 focus:ring-[#F29829]" 
      />
    </div>
  );
}