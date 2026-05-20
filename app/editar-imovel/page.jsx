"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import Header from "@/app/components/header/page";
import Head from "@/app/components/head/page";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { BiTrash } from "react-icons/bi";

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
      // 1. Atualiza textos
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

  if (loading) return <div className="text-center py-20">Carregando...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-gray-300 mt-10 mb-20 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Imóvel</h2>
      
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase">Título</label>
          <input className="w-full p-3 border rounded-md" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase">Preço (R$)</label>
          <input className="w-full p-3 border rounded-md" type="number" value={form.preco_venda} onChange={e => setForm({ ...form, preco_venda: e.target.value })} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase">Descrição</label>
          <textarea rows={4} className="w-full p-3 border rounded-md" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase block mb-2">Fotos Atuais</label>
          <div className="flex flex-wrap gap-2">
            {existingImages.map(img => (
              <img key={img.id} src={img.url} className="w-20 h-20 object-cover rounded-md border" />
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase block mb-2">Adicionar Novas Fotos</label>
          <div className="flex flex-wrap gap-2">
            {newPreviews.map((url, i) => (
              <img key={i} src={url} className="w-20 h-20 object-cover rounded-md border" />
            ))}
            <label className="w-20 h-20 border-2 border-dashed flex items-center justify-center cursor-pointer rounded-md">
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
              <span className="text-2xl text-gray-400">+</span>
            </label>
          </div>
        </div>

        <button disabled={saving} className="w-full py-4 bg-[#F29829] text-white font-bold rounded-md hover:bg-[#1F3445] transition-colors">
          {saving ? "Salvando..." : "SALVAR ALTERAÇÕES"}
        </button>
      </form>
    </div>
  );
}

export default function EditarImovel() {
  return (
    <>
      <Head /> <Header /> <Navbar />
      <Suspense fallback={<div className="text-center py-20">Carregando...</div>}>
        <EdicaoContent />
      </Suspense>
      <Footer />
    </>
  );
}