// app/api/items/[id]/route.ts

export const dynamic = 'force-static'; // Ensure static rendering

export async function GET(req: Request, { params }: { params: { id: string } }) {
  // Extract the 'id' from the params
  const { id } = await params;

  const data = {
    message: `Successfully fetched item with ID: ${id}`,
    error: false,
    status: 200,
  };

  return new Response(JSON.stringify({ data }), { status: 200 });
}
