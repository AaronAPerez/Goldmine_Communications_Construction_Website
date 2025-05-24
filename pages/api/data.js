export const config = {
  runtime: 'edge'
}

export default function handler() {
  return new Response(JSON.stringify({ data: 'fast response' }), {
    headers: { 'content-type': 'application/json' }
  })
}

