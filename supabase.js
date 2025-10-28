/*
  supabase.js
  --------------------------------------------------
  Configuração e helpers para uso do Supabase no projeto.
  - Exporta 'supabase' (cliente) para consultas/insert/update
  - funções utilitárias: adicionarDemanda, uploadArquivos

  Observações importantes:
  - As chaves e URL do Supabase estão embutidas aqui por simplicidade do projeto.
    Em produção, mova essas chaves para variáveis de ambiente ou mecanismo seguro.
  - As funções abaixo alteram a base de dados do Supabase (tabelas: 'demandas') e o Storage
*/

// Importando o Supabase (ESM)
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔑 Credenciais do Supabase (mantenha em local seguro em produção)
const SUPABASE_URL = "https://fvrbxhvveogjsunnoryu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2cmJ4aHZ2ZW9nanN1bm5vcnl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMDA4MjIsImV4cCI6MjA3MDU3NjgyMn0.oKca_CWbxV0eQMseGuv-ZUGTm-F-Ya-0nXM3n-VAk2A";

// Cliente Supabase exportado para uso nos módulos da aplicação
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/*
  adicionarDemanda(demanda)
  - Entrada: objeto demanda com campos esperados (usuario_id, bairro, manifestacao, ...)
  - Efeito: insere um registro na tabela 'demandas' do Supabase
  - Retorna: dados inseridos ou lança erro em caso de falha
*/
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

/*
  uploadArquivos(files, usuarioId)
  - Envia um array de File para o bucket 'demandas-arquivos' no Supabase Storage
  - Gera nomes únicos, tenta enviar cada arquivo e monta URLs públicas
  - Retorna array [{ nome, url }, ...] para serem salvos no registro da demanda
*/
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
