"use client";

import { useState } from "react";

interface Appointment {
  id: number;
  profissional: string;
  especialidade: string;
  clinica: string;
  data: string;
  hora: string;
  status: "confirmado" | "pendente" | "concluido" | "cancelado";
  avatar?: string;
}

const upcomingAppointments: Appointment[] = [
  {
    id: 1,
    profissional: "Dra. Ana Silva",
    especialidade: "Dermatologia Estética",
    clinica: "Luxe Clinic",
    data: "28 de Maio, 2026",
    hora: "09:30",
    status: "confirmado",
  },
  {
    id: 2,
    profissional: "Dr. Roberto Costa",
    especialidade: "Procedimentos",
    clinica: "Luxe Clinic",
    data: "05 de Junho, 2026",
    hora: "14:00",
    status: "pendente",
  },
  {
    id: 3,
    profissional: "Dra. Juliana Lima",
    especialidade: "Limpeza de Pele",
    clinica: "Luxe Clinic",
    data: "12 de Junho, 2026",
    hora: "11:00",
    status: "confirmado",
  },
];

const pastAppointments: Appointment[] = [
  {
    id: 4,
    profissional: "Dra. Ana Silva",
    especialidade: "Consulta Inicial",
    clinica: "Luxe Clinic",
    data: "15 de Maio, 2026",
    hora: "10:00",
    status: "concluido",
  },
  {
    id: 5,
    profissional: "Dr. Roberto Costa",
    especialidade: "Avaliação",
    clinica: "Luxe Clinic",
    data: "02 de Maio, 2026",
    hora: "15:30",
    status: "concluido",
  },
  {
    id: 6,
    profissional: "Dra. Ana Silva",
    especialidade: "Retorno",
    clinica: "Luxe Clinic",
    data: "20 de Abril, 2026",
    hora: "09:00",
    status: "cancelado",
  },
];

const statusConfig = {
  confirmado: { label: "Confirmado", class: "bg-primary/10 text-primary" },
  pendente: { label: "Pendente", class: "bg-amber-50 text-amber-700" },
  concluido: { label: "Concluído", class: "bg-emerald-50 text-emerald-700" },
  cancelado: { label: "Cancelado", class: "bg-error-container text-on-error-container" },
};

export default function ClientAppointments() {
  const [tab, setTab] = useState<"upcoming" | "history">("upcoming");

  const appointments = tab === "upcoming" ? upcomingAppointments : pastAppointments;

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col gap-xl">
      <div className="w-full rounded-2xl overflow-hidden relative flex items-center bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 shadow-sm px-lg md:px-xl lg:px-2xl py-lg min-h-[160px]">
        <div className="relative z-10 w-full">
          <h1 className="font-display-lg text-headline-lg text-primary mb-xs leading-tight">Minhas Consultas</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-[700px]">Acompanhe seus agendamentos, confirme presença e visualize seu histórico de atendimentos.</p>
        </div>
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="flex gap-sm border-b border-outline-variant/30">
        <button
          onClick={() => setTab("upcoming")}
          className={`pb-sm px-sm font-label-md uppercase tracking-wider transition-colors border-b-2 ${
            tab === "upcoming"
              ? "text-primary border-primary"
              : "text-on-surface-variant border-transparent hover:text-primary"
          }`}
        >
          Próximas Consultas ({upcomingAppointments.length})
        </button>
        <button
          onClick={() => setTab("history")}
          className={`pb-sm px-sm font-label-md uppercase tracking-wider transition-colors border-b-2 ${
            tab === "history"
              ? "text-primary border-primary"
              : "text-on-surface-variant border-transparent hover:text-primary"
          }`}
        >
          Histórico ({pastAppointments.length})
        </button>
      </div>

      <div className="flex flex-col gap-md">
        {appointments.map((apt) => {
          const status = statusConfig[apt.status];
          return (
            <div
              key={apt.id}
              className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-md"
            >
              <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container flex-shrink-0">
                <span className="material-symbols-outlined">person</span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">{apt.profissional}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{apt.especialidade}</p>
                <p className="font-label-sm text-label-sm text-outline mt-xs">{apt.clinica}</p>
              </div>

              <div className="flex flex-col sm:items-end gap-xs mt-sm sm:mt-0">
                <div className="flex items-center gap-sm text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-primary-container">calendar_today</span>
                  <span className="font-body-sm text-body-sm font-medium">{apt.data}</span>
                </div>
                <div className="flex items-center gap-sm text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-primary-container">schedule</span>
                  <span className="font-body-sm text-body-sm font-medium">{apt.hora}</span>
                </div>
              </div>

              <div className={`px-sm py-xs rounded-full font-label-sm ${status.class} text-center sm:text-right`}>
                {status.label}
              </div>

              {tab === "upcoming" && apt.status !== "cancelado" && (
                <div className="flex gap-xs sm:flex-col">
                  <button className="px-md py-xs bg-primary text-on-primary rounded-lg font-label-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                    Confirmar
                  </button>
                  <button className="px-md py-xs border border-outline-variant text-on-surface rounded-lg font-label-sm hover:bg-surface-container-low transition-colors whitespace-nowrap">
                    Remarcar
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {appointments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-container/10 flex items-center justify-center mb-lg">
              <span className="material-symbols-outlined text-[40px] text-primary-container">calendar_month</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">Nenhuma consulta encontrada</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {tab === "upcoming" ? "Você não possui consultas agendadas." : "Nenhum histórico disponível."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
