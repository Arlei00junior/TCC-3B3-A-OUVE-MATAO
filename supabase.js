// Importando o Supabase
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔑 Coloque aqui as credenciais do seu projeto Supabase
const SUPABASE_URL = "https://fvrbxhvveogjsunnoryu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2cmJ4aHZ2ZW9nanN1bm5vcnl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMDA4MjIsImV4cCI6MjA3MDU3NjgyMn0.oKca_CWbxV0eQMseGuv-ZUGTm-F-Ya-0nXM3n-VAk2A";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export async function adicionarDemanda(demanda) {
    const { data, error } = await supabase
        .from('demandas')
        .insert([{
            usuario_id: demanda.usuario_id,
            bairro: demanda.bairro,
            manifestacao: demanda.manifestacao,
            prioridade: demanda.prioridade,
            arquivos: demanda.arquivos || null,
            categoria: demanda.categoria || null,
            status: demanda.status || "Pendente",
            resposta: demanda.resposta || null
        }]);

    if (error) throw error;
    return data;
}

// Função para enviar arquivos para o Supabase Storage
export async function uploadArquivos(files, usuarioId) {
    const arquivosEnviados = [];

    for (const file of files) {
        // Cria um nome único para cada arquivo
        const fileName = `${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage
            .from('demandas-arquivos')  // Nome do bucket que você criou
            .upload(fileName, file);

        if (error) {
            console.error('Erro ao enviar arquivo:', file.name, error);
            continue;
        }

        // Monta URL pública do arquivo
        const url = supabase.storage.from('demandas-arquivos').getPublicUrl(fileName).data.publicUrl;
        arquivosEnviados.push({ nome: file.name, url });
    }

    return arquivosEnviados; // Retorna array de objetos com nome e url
}
