export const metadata = {
  title: "Aurora Loja Maçônica",
  description: "Sistema institucional com gestão completa e dados protegidos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#f8fbfd",
        }}
      >
        {children}
      </body>
    </html>
  );
}
