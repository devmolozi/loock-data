import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://qualitymidia.com/logs.php?url=${url}&key=VoltzApi`, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    console.log('URL recebida:', url);
    console.log('Resposta da API:', await response.text());

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados da API externa' },
      { status: 500 }
    );
  }
}