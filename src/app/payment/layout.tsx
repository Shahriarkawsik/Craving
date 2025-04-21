export default function paymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <section className="min-h-screen bg-gray-50 text-gray-900">
          {children}
        </section>
      </body>
    </html>
  );
}
