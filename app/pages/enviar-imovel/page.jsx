"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import Header from "@/app/components/header/page";
import Head from "@/app/components/head/page";
import Footer from "@/app/components/footer/page";
import Navbar from "@/app/components/navbar/page";
import { BiCheckCircle, BiTrash, BiImageAdd } from "react-icons/bi";

export default function EnviarImovel() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const clienteId = localStorage.getItem("alexandria_cliente_id");
    if (!clienteId) {
      router.push("/cadastro");
    }
  }, [router]);

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
    
    const clienteId = localStorage.getItem("alexandria_cliente_id");
    if (!clienteId) return alert("Você precisa estar logado!");
    if (files.length === 0) return alert("Adicione pelo menos uma foto.");
    
    setLoading(true);

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
        const fileName = `${imovel.id}/${Date.now()}_${i}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("imoveis")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("imoveis")
          .getPublicUrl(fileName);
        
        await supabase.from("imovel_imagens").insert([{
          imovel_id: imovel.id, 
          url: publicUrl, 
          ordem: i, 
          capa: i === 0 
        }]);
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
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <Head /> <Header /> <Navbar />

      <div className="flex flex-col items-center py-16 text-center px-4">
        <span className="text-[#F29829] font-bold uppercase tracking-[0.2em] text-xs mb-2 block">
          Novo Anúncio
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Enviar Imóvel
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md leading-relaxed">
          Preencha os dados abaixo para enviar o seu imóvel para análise da nossa equipe.
        </p>
        <span className="block mt-4 h-1 w-16 bg-[#F29829] rounded-full" />
      </div>

      <main className="flex-grow px-4 pb-20 w-full max-w-2xl mx-auto">
        <div className="bg-white border border-slate-100 rounded-2xl shadow-md p-6 sm:p-8 transition-all duration-300">
          {sucesso ? (
            <div className="text-center py-12 flex flex-col items-center space-y-4">
              <div className="bg-emerald-50 p-4 rounded-full text-emerald-500 animate-bounce">
                <BiCheckCircle size={52} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Enviado com Sucesso!</h2>
              <p className="text-slate-500 text-sm max-w-sm">
                Seu imóvel foi cadastrado e está na fila de aprovação. Em breve ele estará ativo no portal da Alexandria!
              </p>
              <button 
                onClick={() => router.push("/meus-imoveis")}
                className="mt-4 px-6 py-2.5 bg-[#1F3445] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#F29829] transition-colors shadow-sm"
              >
                Ver meus imóveis
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <Input 
                label="Título do Anúncio" 
                placeholder="Ex: Excelente Casa de 3 Quartos com Suíte"
                value={form.titulo} 
                onChange={(v) => setForm({...form, titulo: v})} 
                required
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  label="Preço de Venda (R$)" 
                  type="number" 
                  placeholder="0,00"
                  value={form.preco_venda} 
                  onChange={(v) => setForm({...form, preco_venda: v})} 
                  required
                />
                
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Tipo de Imóvel</label>
                  <select 
                    className="h-12 border border-slate-200 bg-slate-50/50 rounded-xl px-4 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829] cursor-pointer"
                    value={form.tipo}
                    onChange={(e) => setForm({...form, tipo: e.target.value})}
                  >
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="terreno">Terreno</option>
                    <option value="comercial">Comercial</option>
                  </select>
                </div>
              </div>

              <Input 
                label="Logradouro (Rua, Número)" 
                placeholder="Ex: Rua das Flores, 123"
                value={form.logradouro} 
                onChange={(v) => setForm({...form, logradouro: v})} 
                required
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  label="Bairro" 
                  placeholder="Ex: Centro"
                  value={form.bairro} 
                  onChange={(v) => setForm({...form, bairro: v})} 
                  required
                />
                <Input 
                  label="CEP" 
                  type="text" 
                  placeholder="Ex: 37470000"
                  value={form.cep} 
                  onChange={(v) => setForm({...form, cep: v})} 
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Descrição Detalhada</label>
                <textarea 
                  rows={4} 
                  required
                  placeholder="Fale sobre os detalhes do imóvel, acabamento, vagas de garagem, etc..."
                  className="w-full border border-slate-200 bg-slate-50/50 rounded-xl p-4 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829] resize-none" 
                  value={form.descricao}
                  onChange={(e) => setForm({...form, descricao: e.target.value})} 
                />
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Fotos do Imóvel <span className="text-rose-500">*</span>
                </label>
                
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {previews.map((url, index) => (
                    <div key={index} className="relative aspect-square w-full rounded-xl overflow-hidden border border-slate-200 group/img shadow-sm">
                      <img src={url} className="w-full h-full object-cover" alt="Preview do imóvel" />
                      <button 
                        type="button" 
                        onClick={() => removeFile(index)} 
                        className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-1 shadow-md hover:bg-rose-700 transition-colors cursor-pointer"
                        title="Remover foto"
                      >
                        <BiTrash size={14}/>
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-0 inset-x-0 bg-slate-900/70 text-[9px] text-white text-center py-0.5 uppercase font-bold tracking-wider">
                          Capa
                        </span>
                      )}
                    </div>
                  ))}
                  
                  <label className="aspect-square w-full border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#F29829] hover:bg-amber-50/20 transition-all group shadow-sm">
                    <BiImageAdd size={26} className="text-slate-400 group-hover:text-[#F29829] transition-colors" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-1 group-hover:text-[#F29829] transition-colors">Add</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">A primeira foto adicionada será usada como capa do anúncio.</p>
              </div>

              <button 
                type="submit"
                disabled={loading} 
                className="w-full h-12 mt-4 rounded-xl bg-[#F29829] hover:bg-[#1F3445] text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 disabled:bg-slate-300 shadow-sm shadow-[#F29829]/20 cursor-pointer"
              >
                {loading ? "Enviando dados..." : "Enviar Imóvel para Análise"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder = "", required = false }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input 
        type={type} 
        value={value} 
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)} 
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829]" 
      />
    </div>
  );
}