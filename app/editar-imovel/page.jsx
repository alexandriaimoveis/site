"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import Header from "@/app/components/header/page";
import Head from "@/app/components/head/page";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { BiImageAdd, BiSave, BiLoaderAlt } from "react-icons/bi";
import WhatsAppButton from "../components/whatsapp/page";

function EdicaoContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ titulo: "", preco_venda: "", descricao: "" });
  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);

  useEffect(() => {
    async function carregarImovel() {
      if (!id) return;

      const { data, error } = await supabase
        .from("imoveis")
        .select(`
          titulo, 
          preco_venda, 
          descricao,
          imovel_imagens (id, url, capa) 
        `)
        .eq("id", Number(id))
        .maybeSingle();

      if (data) {
        setForm({
          titulo: data.titulo || "",
          preco_venda: data.preco_venda || "",
          descricao: data.descricao || ""
        });
        setExistingImages(data.imovel_imagens || []);
      }
      setLoading(false);
    }
    carregarImovel();
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setNewFiles((prev) => [...prev, ...selectedFiles]);
    const previews = selectedFiles.map(file => URL.createObjectURL(file));
    setNewPreviews((prev) => [...prev, ...previews]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error: updateError } = await supabase
        .from("imoveis")
        .update({ 
          titulo: form.titulo,
          preco_venda: Number(form.preco_venda),
          descricao: form.descricao 
        })
        .eq("id", Number(id));

      if (updateError) throw updateError;

      for (const file of newFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${id}/${Date.now()}_${Math.random()}.${fileExt}`;
        
        await supabase.storage.from("imoveis").upload(fileName, file);
        const { data: { publicUrl } } = supabase.storage.from("imoveis").getPublicUrl(fileName);
        
        await supabase.from("imovel_imagens").insert([{
          imovel_id: Number(id), 
          url: publicUrl, 
          ordem: 0, 
          capa: false 
        }]);
      }

      alert("Imóvel atualizado com sucesso!");
      router.push("/pages/meus-imoveis");
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3 flex-grow">
        <BiLoaderAlt size={32} className="text-[#F29829] animate-spin" />
        <p className="text-sm text-slate-500 font-medium">Buscando detalhes do imóvel...</p>
      </div>
    );
  }

  return (
    <main className="flex-grow px-4 pb-20 w-full max-w-2xl mx-auto">
      <div className="bg-white border border-slate-100 rounded-2xl shadow-md p-6 sm:p-8 transition-all duration-300">
        <form onSubmit={handleSave} className="space-y-5">
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Título do Anúncio</label>
            <input 
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829]" 
              value={form.titulo} 
              onChange={e => setForm({ ...form, titulo: e.target.value })} 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Preço de Venda (R$)</label>
            <input 
              required
              type="number" 
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829]" 
              value={form.preco_venda} 
              onChange={e => setForm({ ...form, preco_venda: e.target.value })} 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Descrição Detalhada</label>
            <textarea 
              rows={4} 
              required
              className="w-full border border-slate-200 bg-slate-50/50 rounded-xl p-4 text-sm text-slate-800 outline-none transition-all focus:border-[#F29829] focus:bg-white focus:ring-1 focus:ring-[#F29829] resize-none" 
              value={form.descricao} 
              onChange={e => setForm({ ...form, descricao: e.target.value })} 
            />
          </div>

          {existingImages.length > 0 && (
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Fotos Cadastradas
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {existingImages.map(img => (
                  <div key={img.id} className="relative aspect-square w-full rounded-xl overflow-hidden border border-slate-100 shadow-sm group">
                    <img src={img.url} className="w-full h-full object-cover" alt="Foto do imóvel" />
                    {img.capa && (
                      <span className="absolute bottom-0 inset-x-0 bg-slate-900/70 text-[9px] text-white text-center py-0.5 uppercase font-bold tracking-wider">
                        Capa
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Adicionar Novas Fotos
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {newPreviews.map((url, i) => (
                <div key={i} className="relative aspect-square w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={url} className="w-full h-full object-cover" alt="Nova foto selecionada" />
                </div>
              ))}
              
              <label className="aspect-square w-full border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#F29829] hover:bg-amber-50/20 transition-all group shadow-sm">
                <BiImageAdd size={24} className="text-slate-400 group-hover:text-[#F29829] transition-colors" />
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-1 group-hover:text-[#F29829] transition-colors">Nova</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          </div>

          <button 
            type="submit"
            disabled={saving} 
            className="flex items-center justify-center gap-2 w-full h-12 mt-6 rounded-xl bg-[#F29829] hover:bg-[#1F3445] text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 disabled:bg-slate-300 shadow-sm shadow-[#F29829]/20 cursor-pointer"
          >
            <BiSave size={18} />
            {saving ? "Salvando Alterações..." : "Salvar Alterações"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function EditarImovel() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <Head /> 
      <Header /> 
      <Navbar />
      
      <div className="flex flex-col items-center py-16 text-center px-4">
        <span className="text-[#F29829] font-bold uppercase tracking-[0.2em] text-xs mb-2 block">
          Gerenciador
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Editar Imóvel
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md leading-relaxed">
          Modifique as informações principais ou adicione novos arquivos de mídia ao seu anúncio.
        </p>
        <span className="block mt-4 h-1 w-16 bg-[#F29829] rounded-full" />
      </div>

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-20 space-y-3 flex-grow">
          <BiLoaderAlt size={32} className="text-[#F29829] animate-spin" />
          <p className="text-sm text-slate-500 font-medium">Carregando formulário...</p>
        </div>
      }>
        <EdicaoContent />
      </Suspense>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}