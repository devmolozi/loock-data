"use client";

import Link from "next/link";
import { useState } from "react";

interface LoginData {
  url: string;
  username: string;
  password: string;
}


export default function Home() {

  const [searchUrl, setSearchUrl] = useState("");
  const [loginData, setLoginData] = useState<LoginData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchUrl) {
      setError("Por favor, insira uma URL para buscar");
      return;
    }

    setLoading(true);
    setError("");
    setLoginData(null);

    try {
      const response = await fetch(`/api/search?url=${encodeURIComponent(searchUrl)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar dados');
      }

      if (!data.users_accounts || data.users_accounts.length === 0) {
        setError("Nenhum dado encontrado para esta URL");
        return;
      }

      setLoginData(data.users_accounts);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setError("Não foi possível encontrar dados para esta URL. Tente novamente.");
      setLoginData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="grid justify-center items-center w-full h-50 px-4">
        <nav className="flex flex-col sm:flex-row justify-around items-center gap-4 w-full">
          <div className="logo flex text-left">
            <h1 className="text-2xl font-bold"><Link href="/">Loock Data</Link></h1>
          </div>
          <ul className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full sm:w-auto">
            <div className="flex w-full sm:w-auto gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="p-1 text-lg border-b border-gray-300 w-full sm:w-64 focus:border-b focus:border-blue-500 outline-none "

                value={searchUrl}
                onChange={(e) => setSearchUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />

            </div>
            <div className="flex gap-4">
              <li className="text-lg"><Link href="api/api-loockdata">API</Link></li>
              <li className="text-lg"><Link href="https://t.me/Lavonth" target="_blank">Support</Link></li>
            </div>
          </ul>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center w-full px-4">
        <div className="grid justify-center items-center text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">Loock Data.</h1>
          <p className="text-base sm:text-lg text-normal mt-1">Search for logins with <strong><Link href="/">Loock Data.</Link></strong></p>
        </div>

        {(loading || error || loginData) && (
          <div className="logins mt-10 pt-5 w-full max-w-4xl">
            {loading ? (
              <p className="text-center text-green-500">Loading, please wait...</p>
            ) : error ? (
              <div className="text-center">
                <p className="text-red-500">{error}</p>
                <p className="text-gray-500 mt-2">Tente buscar outra URL</p>
              </div>
            ) : loginData && Array.isArray(loginData) && loginData.length > 0 ? (
              <>
                <div className="text-center mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-400">Total de contas encontradas: {loginData.length}</h2>
                </div>
                <ul className="justify-center items-center gap-4 border-2 border-gray-300 rounded-2xl p-2">
                  {loginData.map((login, index) => (
                    <li key={index} className="mb-4 p-2 border-b border-gray-200 last:border-b-0 break-all">
                      <p>URL: <a href={`https://${login.url}`} target="_blank" className="text-blue-400">{login.url}</a></p>
                      <p>Username: {login.username}</p>
                      <p>Password: {login.password}</p>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        )}
      </main>

      <footer className="w-full h-30 py-4 flex items-center justify-center">
        <p className="text-sm sm:text-base">Loock Data. All rights reserved.</p>
      </footer>
    </div>
  );
}
