import type { Metadata } from 'next'

export const metadata:Metadata = {
  title: "Backend Swagger",
  description: "Backend API with Firebase and Swagger",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>{children}</body>
    </html>
  );
}
