"use client";

import { useState } from "react";

interface MedicalRecord {
  id: number;
  tipo: string;
  profissional: string;
  data: string;
  resumo: string;
  anexos: number;
}

interface Prescription {
  id: number;
  medicamento: string;
  dosagem: string;
  profissional: string;
  data: string;
  instrucoes: string;
}

interface Photo {
  id: number;
  descricao: string;
  data: string;
  tipo: "antes" | "depois";
  area: string;
}

const records: MedicalRecord[] = [
  {
    id: 1,
    tipo: "Consulta Inicial",
    profissional: "Dra. Ana Silva",
    data: "15/05/2026",
    resumo: "Paciente apresenta ressecamento cutâneo e linhas de expressão na região frontal. Recomendada avaliação complementar.",
    anexos: 3,
  },
  {
    id: 2,
    tipo: "Avaliação Estética",
    profissional: "Dr. Roberto Costa",
    data: "02/05/2026",
    resumo: "Realizada avaliação para procedimento de preenchimento labial. Planejamento concluído.",
    anexos: 5,
  },
  {
    id: 3,
    tipo: "Retorno",
    profissional: "Dra. Ana Silva",
    data: "20/04/2026",
    resumo: "Paciente relata melhora significativa após primeira sessão. Manter rotina de hidratação prescrita.",
    anexos: 1,
  },
];

const prescriptions: Prescription[] = [
  {
    id: 1,
    medicamento: "Hidratante Facial com Ácido Hialurônico",
    dosagem: "Aplicar 2x ao dia",
    profissional: "Dra. Ana Silva",
    data: "15/05/2026",
    instrucoes: "Manhã e noite após limpeza facial. Evitar exposição solar sem proteção.",
  },
  {
    id: 2,
    medicamento: "Protetor Solar FPS 60",
    dosagem: "Reaplicar a cada 3 horas",
    profissional: "Dra. Ana Silva",
    data: "15/05/2026",
    instrucoes: "Uso diário obrigatório. Reaplicar antes da exposição solar direta.",
  },
  {
    id: 3,
    medicamento: "Creme Clareador noturno",
    dosagem: "Aplicar 1x ao dia à noite",
    profissional: "Dra. Juliana Lima",
    data: "02/05/2026",
    instrucoes: "Aplicar fina camada nas áreas desejadas. Evitar contato com olhos e mucosas.",
  },
];

const photos: Photo[] = [
  { id: 1, descricao: "Região frontal - linhas de expressão", data: "15/04/2026", tipo: "antes", area: "Face" },
  { id: 2, descricao: "Região frontal pós 1ª sessão", data: "15/05/2026", tipo: "depois", area: "Face" },
  { id: 3, descricao: "Lábios - avaliação inicial", data: "02/05/2026", tipo: "antes", area: "Lábios" },
  { id: 4, descricao: "Lábios - pós procedimento", data: "10/05/2026", tipo: "depois", area: "Lábios" },
  { id: 5, descricao: "Região periocular", data: "15/04/2026", tipo: "antes", area: "Olhos" },
  { id: 6, descricao: "Região periocular - evolução", data: "15/05/2026", tipo: "depois", area: "Olhos" },
];

export default function ClientHistory() {
  const [tab, setTab] = useState<"records" | "prescriptions" | "photos">("records");

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col gap-xl">
      <div className="w-full rounded-2xl overflow-hidden relative flex items-center bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 shadow-sm px-lg md:px-xl lg:px-2xl py-lg min-h-[160px]">
        <div className="relative z-10 w-full">
          <h1 className="font-display-lg text-headline-lg text-primary mb-xs leading-tight">Meu Histórico</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-[700px]">Acesse prontuários, receitas e fotos de antes e depois dos seus atendimentos.</p>
        </div>
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="flex gap-sm border-b border-outline-variant/30">
        <button
          onClick={() => setTab("records")}
          className={`pb-sm px-sm font-label-md uppercase tracking-wider transition-colors border-b-2 ${
            tab === "records"
              ? "text-primary border-primary"
              : "text-on-surface-variant border-transparent hover:text-primary"
          }`}
        >
          Prontuários ({records.length})
        </button>
        <button
          onClick={() => setTab("prescriptions")}
          className={`pb-sm px-sm font-label-md uppercase tracking-wider transition-colors border-b-2 ${
            tab === "prescriptions"
              ? "text-primary border-primary"
              : "text-on-surface-variant border-transparent hover:text-primary"
          }`}
        >
          Receitas ({prescriptions.length})
        </button>
        <button
          onClick={() => setTab("photos")}
          className={`pb-sm px-sm font-label-md uppercase tracking-wider transition-colors border-b-2 ${
            tab === "photos"
              ? "text-primary border-primary"
              : "text-on-surface-variant border-transparent hover:text-primary"
          }`}
        >
          Fotos ({photos.length})
        </button>
      </div>

      {tab === "records" && (
        <div className="flex flex-col gap-md">
          {records.map((r) => (
            <div
              key={r.id}
              className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-all duration-300 flex flex-col gap-md"
            >
              <div className="flex items-start gap-md">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined">clinical_notes</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-sm flex-wrap">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{r.tipo}</h3>
                    <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">{r.data}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-sm">{r.resumo}</p>
                  <div className="flex items-center gap-md mt-md flex-wrap">
                    <span className="font-label-sm text-label-sm text-outline flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[14px]">person</span>
                      {r.profissional}
                    </span>
                    <span className="font-label-sm text-label-sm text-outline flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[14px]">attachment</span>
                      {r.anexos} anexo(s)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-sm pt-sm border-t border-outline-variant/10">
                <button className="px-md py-xs border border-outline-variant text-on-surface rounded-lg font-label-sm hover:bg-surface-container-low transition-colors">
                  Compartilhar
                </button>
                <button className="px-md py-xs bg-primary text-on-primary rounded-lg font-label-sm hover:opacity-90 transition-opacity flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  Visualizar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "prescriptions" && (
        <div className="flex flex-col gap-md">
          {prescriptions.map((p) => (
            <div
              key={p.id}
              className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-md">
                <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary flex-shrink-0">
                  <span className="material-symbols-outlined">medication</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-sm flex-wrap">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{p.medicamento}</h3>
                    <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">{p.data}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-primary-container font-medium mt-xs">{p.dosagem}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-sm">{p.instrucoes}</p>
                  <p className="font-label-sm text-label-sm text-outline mt-md flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[14px]">person</span>
                    Prescrito por: {p.profissional}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "photos" && (
        <div className="flex flex-col gap-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
            {photos.map((p) => (
              <div
                key={p.id}
                className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/10 hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <div className={`h-40 flex items-center justify-center relative ${
                  p.tipo === "antes" ? "bg-primary-container/10" : "bg-secondary-fixed/30"
                }`}>
                  <span className={`material-symbols-outlined text-[56px] ${
                    p.tipo === "antes" ? "text-primary-container" : "text-secondary"
                  }`}>
                    {p.tipo === "antes" ? "image" : "enhanced_encryption"}
                  </span>
                  <span className={`absolute top-sm right-sm px-sm py-xs rounded-full font-label-sm text-[10px] ${
                    p.tipo === "antes"
                      ? "bg-primary-container text-on-primary-container"
                      : "bg-secondary text-on-secondary"
                  }`}>
                    {p.tipo === "antes" ? "ANTES" : "DEPOIS"}
                  </span>
                </div>
                <div className="p-md">
                  <div className="flex items-center justify-between gap-sm">
                    <h3 className="font-body-sm font-medium text-on-surface">{p.descricao}</h3>
                    <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">{p.data}</span>
                  </div>
                  <p className="font-label-sm text-label-sm text-outline mt-xs">{p.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
