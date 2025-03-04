import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Adiciona suporte a Edge Runtime

export const maxDuration = 300; // Aumenta para 5 minutos

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 });
  }

  try {
    const apiUrl = `https://qualitymidia.com/logs.php?url=${url}&key=VoltzApi`;

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('API não retornou JSON válido');
    }

    const data = await response.json();

    if (!data || !data.users_accounts) {
      throw new Error('Formato de resposta inválido');
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Erro detalhado:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}