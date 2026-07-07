'use client';

import { useState, useEffect } from 'react';

interface HealthResponse {
  status: string;
  timestamp: string;
  message: string;
}

export default function Home() {
  const [apiStatus, setApiStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [apiData, setApiData] = useState<HealthResponse | null>(null);

  useEffect(() => {
    // Apuntamos al endpoint de Render que dejamos operativo
    fetch('https://cero-ci-cd-backend.onrender.com/api/health')
      .then((res) => {
        if (!res.ok) throw new Error('Error na rede');
        return res.json();
      })
      .then((data: HealthResponse) => {
        setApiData(data);
        setApiStatus('connected');
      })
      .catch((err) => {
        console.error(err);
        setApiStatus('error');
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-12 dark:bg-slate-950 sm:px-12">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        
        {/* Encabezado con badge de GitHub Actions */}
        <div className="flex flex-col gap-2">
          <div className="inline-flex self-start items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            GitHub Actions Activo
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Benvido á páxina de proba de CI/CD
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Esta aplicación está a ser construída e despregada de xeito totalmente automatizado.
          </p>
        </div>

        {/* Sección de Conexión Full Stack con Render */}
        <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Estado da API de Backend (Render)
          </h2>
          
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/50 dark:bg-slate-900/50">
            {apiStatus === 'loading' && (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600"></div>
                <span className="text-sm text-slate-500">Conectando co backend...</span>
              </>
            )}

            {apiStatus === 'connected' && (
              <>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white text-xs font-bold">✓</div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">En liña</span>
                  <span className="text-xs text-slate-400">{apiData?.message}</span>
                </div>
              </>
            )}

            {apiStatus === 'error' && (
              <>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">!</div>
                <span className="text-sm text-red-600 dark:text-red-400">Erro ao conectar coa API de Render</span>
              </>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}