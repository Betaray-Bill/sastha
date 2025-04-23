import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; 
import Script from "next/script";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sashtha Power Services | Kirloskar Generator Authorized Dealer in Chennai",
  description: "We Sashtha Power Services is an Authorized Kirloskar Generator Dealer in Ekkatuthangal,Chennai, Offering from 2kVA to 200Kva Generators.We provide Best Generator, Solar Panel Rentals and services",
  keywords:["KOEL Generator Dealer in Chennai", "Solar Panel Rental in Sashtha Power services", "Diesel Generator", "Diesel Genset",  "Kirloskar Generator Dealer Chennai", 
    "Best Generator Rental Chennai",
    "KOEL Generator Price",
    "Koel Generator Dealer - Sashtha Power",
    "Diesel Generator for Industry",
    "Kirloskar DG Set Chennai","Gas Generator", "Portable DG", "Optiprime DG", "Best Rental DG"],
  openGraph: {
    images:[],
    title: "Sashtha Power Services | Kirloskar Generator Authorized Dealer in Chennai",
    description: "We Sashtha Power Services is an Authorized Kirloskar Generator Dealer in Chennai, Offering from 2kVA to 200Kva Generators. We provide Solar Rentals and services",
    url: "https://sashthapower.in/",
    site_name: "Sashtha Power Services",
    type: "website",
  },
  canonical: "https://sashthapower.in/", 
};


export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sashtha Power Services",
    "image": "https://sashthapower.in/", 
    "@id": "https://sashthapower.in/",
    "url": "https://sashthapower.in/",
    "telephone": "+91 07947062185", 
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No 12A/1, First Floor, Visalakshi Nagar, 2nd Street,",
      "addressLocality": "Ekkaduthangal, Chennai",
      "postalCode": "600032",
      "addressCountry": "IN",
    },
    "openingHours": "Mo-Fr 09:00-18:00",
  };

  return (
    <html lang="en">
      <Head>
       <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </  Head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
