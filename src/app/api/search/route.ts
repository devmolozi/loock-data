import { NextResponse } from 'next/server';

export const maxDuration = 300; // Aumenta para 5 minutos

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 290000); // 290 segundos

    console.log('Iniciando requisição para:', url);

    const response = await fetch(`https://qualitymidia.com/logs.php?url=${url}&key=VoltzApi`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      signal: controller.signal,
      next: { revalidate: 0 }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    console.log('Dados recebidos:', data);

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error('Erro detalhado:', error);
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'A requisição demorou muito tempo. Tente novamente.' },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: 'Erro ao buscar dados da API externa' },
      { status: 500 }
    );
  }
}