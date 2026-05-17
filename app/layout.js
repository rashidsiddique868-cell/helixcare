import "./globals.css";

export const metadata = {
  title: "HelixCare — Prevention Begins Before Symptoms",
  description:
    "AI-powered preventive genetics and health intelligence platform. Identify inherited risks, analyze reports, and get personalized screening plans.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}