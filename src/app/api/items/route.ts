export const dynamic = 'force-static'
 
export async function GET() {
interface Data {
    message: string;
    error: boolean;
    status: number;
}
 const data: Data = {
    message: "Successfully get data",
    error: false,
    status: 200
 }
  return Response.json({ data })
}

export async function POST(req: Request) {
  const data = await req.json()
  return Response.json({ data })
}