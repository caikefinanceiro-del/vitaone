"use client";

import { useState } from "react";

interface Payment {
  id: number;
  descricao: string;
  profissional: string;
  data: string;
  valor: number;
  status: "pago" | "pendente" | "vencido";
  metodo?: string;
}

const pendingPayments: Payment[] = [
  {
    id: 1,
    descricao: "Limpeza de Pele",
    profissional: "Dra. Juliana Lima",
    data: "Vencimento: 30/05/2026",
    valor: 180.00,
    status: "pendente",
  },
  {
    id: 2,
    descricao: "Consulta Dermatológica",
    profissional: "Dra. Ana Silva",
    data: "Vencimento: 10/06/2026",
    valor: 250.00,
    status: "pendente",
  },
  {
    id: 3,
    descricao: "Sinal Procedimento",
    profissional: "Dr. Roberto Costa",
    data: "Vencimento: 25/05/2026",
    valor: 350.00,
    status: "vencido",
  },
];

const paymentHistory: Payment[] = [
  {
    id: 4,
    descricao: "Avaliação Estética",
    profissional: "Dra. Ana Silva",
    data: "15/05/2026",
    valor: 150.00,
    status: "pago",
    metodo: "PIX",
  },
  {
    id: 5,
    descricao: "Consulta Inicial",
    profissional: "Dr. Roberto Costa",
    data: "02/05/2026",
    valor: 200.00,
    status: "pago",
    metodo: "Cartão de Crédito",
  },
  {
    id: 6,
    descricao: "Retorno",
    profissional: "Dra. Ana Silva",
    data: "20/04/2026",
    valor: 100.00,
    status: "pago",
    metodo: "PIX",
  },
];

const paymentStatusConfig = {
  pago: { label: "Pago", class: "bg-emerald-50 text-emerald-700" },
  pendente: { label: "Pendente", class: "bg-amber-50 text-amber-700" },
  vencido: { label: "Vencido", class: "bg-error-container text-on-error-container" },
};

export default function ClientPayments() {
  const [tab, setTab] = useState<"pending" | "history">("pending");

  const totalPendente = pendingPayments
    .filter((p) => p.status !== "pago")
    .reduce((acc, p) => acc + p.valor, 0);

  const payments = tab === "pending" ? pendingPayments : paymentHistory;

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col gap-xl">
      <div className="w-full rounded-2xl overflow-hidden relative flex items-center bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 shadow-sm px-lg md:px-xl lg:px-2xl py-lg min-h-[160px]">
        <div className="relative z-10 w-full">
          <h1 className="font-display-lg text-headline-lg text-primary mb-xs leading-tight">Pagamentos</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-[700px]">Visualize e realize pagamentos de suas pendências financeiras.</p>
        </div>
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Saldo Pendente</p>
          <p className="font-display-lg text-headline-lg text-primary font-bold">
            R$ {totalPendente.toFixed(2).replace(".", ",")}
          </p>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Faturas Pendentes</p>
          <p className="font-display-lg text-headline-lg text-primary font-bold">
            {pendingPayments.filter((p) => p.status === "pendente").length}
          </p>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Total Pago</p>
          <p className="font-display-lg text-headline-lg text-primary font-bold">
            R$ {paymentHistory.filter((p) => p.status === "pago").reduce((acc, p) => acc + p.valor, 0).toFixed(2).replace(".", ",")}
          </p>
        </div>
      </div>

      <div className="flex gap-sm border-b border-outline-variant/30">
        <button
          onClick={() => setTab("pending")}
          className={`pb-sm px-sm font-label-md uppercase tracking-wider transition-colors border-b-2 ${
            tab === "pending"
              ? "text-primary border-primary"
              : "text-on-surface-variant border-transparent hover:text-primary"
          }`}
        >
          Pendências ({pendingPayments.length})
        </button>
        <button
          onClick={() => setTab("history")}
          className={`pb-sm px-sm font-label-md uppercase tracking-wider transition-colors border-b-2 ${
            tab === "history"
              ? "text-primary border-primary"
              : "text-on-surface-variant border-transparent hover:text-primary"
          }`}
        >
          Histórico ({paymentHistory.length})
        </button>
      </div>

      <div className="flex flex-col gap-md">
        {payments.map((p) => {
          const st = paymentStatusConfig[p.status];
          return (
            <div
              key={p.id}
              className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-md"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                p.status === "pago"
                  ? "bg-emerald-50 text-emerald-600"
                  : p.status === "vencido"
                  ? "bg-error-container text-on-error-container"
                  : "bg-primary/10 text-primary"
              }`}>
                <span className="material-symbols-outlined">
                  {p.status === "pago" ? "check_circle" : p.status === "vencido" ? "error" : "receipt"}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">{p.descricao}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{p.profissional}</p>
                <p className="font-label-sm text-label-sm text-outline mt-xs">{p.data}</p>
              </div>

              <div className="text-right">
                <p className="font-headline-sm text-headline-sm text-on-surface">
                  R$ {p.valor.toFixed(2).replace(".", ",")}
                </p>
                {p.metodo && (
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">{p.metodo}</p>
                )}
              </div>

              <div className={`px-sm py-xs rounded-full font-label-sm ${st.class} text-center`}>
                {st.label}
              </div>

              {tab === "pending" && (
                <button
                  className="px-md py-xs bg-primary text-on-primary rounded-lg font-label-sm hover:opacity-90 transition-opacity whitespace-nowrap flex items-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">payment</span>
                  Pagar
                </button>
              )}
            </div>
          );
        })}

        {payments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-container/10 flex items-center justify-center mb-lg">
              <span className="material-symbols-outlined text-[40px] text-primary-container">payments</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">Nenhum pagamento encontrado</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {tab === "pending" ? "Você não possui pendências no momento." : "Nenhum histórico disponível."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
