import {getFirestore} from "firebase-admin/firestore";
import {getStorage} from "firebase-admin/storage";
import {initAdmin} from "@/lib/firebaseAdmin"; // Ensure you have a Firebase admin init file
import Script from "next/script";
import Head from "next/head";


initAdmin();
const firestore = getFirestore();

export async function generateStaticParams() {

    const generatorRef = firestore.collection("generator");
    const snapshot = await generatorRef.get();
    const generatorData = snapshot
        .docs
        .map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
    // console.log(generatorData)
    return generatorData.map((post) => ({id: post.id}));
}

export async function generateMetadata({params}) {
    const {id} = params;
    const firestore = getFirestore();
    const docRef = firestore
        .collection("generator")
        .doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
        return {
            title: "Sashtha Power Services | Kirloskar Generator Authorized Dealer in Chennai",
            description: "We Sashtha Power Services is an Authorized Kirloskar Generator Dealer in Ekkaduthangal,Chennai, Offering from 2kVA to 200Kva Generators.We provide Best Generator, Solar Panel Rentals and services",
            keywords: [
                "KOEL Generator Dealer in Chennai",
                "Solar Panel Rental in Sashtha Power services",
                "Diesel Generator",
                "Diesel Genset",
                "Gas Generator",
                "Portable DG",
                "Optiprime DG",
                "Best Rental DG"
            ],
            openGraph: {
                images: [],
                title: "Sashtha Power Services | Kirloskar Generator Authorized Dealer in Chennai",
                description: "We Sashtha Power Services is an Authorized Kirloskar Generator Dealer in Chennai" +
                        ", Offering from 2kVA to 200Kva Generators. We provide Solar Rentals and services",
                url: "https://sasthapowerservices.com",
                site_name: "Sashtha Power Services",
                type: "website"
            },
            canonical: "https://sasthapowerservices.com"
        };
    }

    const data = docSnap.data();
    console.log(data)
    return {
        title: `${data.metaData.metaTitle}`,
        description: data.metaData.metaDescription || "Explore our range of Kirloskar Generators from 2kVA to 200kVA.",
        keywords: data.metaData.metaKeywords || [
            "Diesel Generator", "Gas Generator", "Portable Generator"
        ],
        openGraph: {
            title: `${data.metaData.metaTitle} | Kirloskar Generator Dealer in Chennai`,
            description: data.metaData.metaDescription || "Find the best generator deals in Chennai.",
            url: `https://sashthapower.in/generator/${id}`,
            site_name: "Sashtha Power Services",
            type: "article",
            images: data.images && data.images.length > 0
                ? [
                    {
                        url: data.images[0].src,
                        alt: data.images[0].alt
                    }
                ]
                : [
                    {
                        url: "https://sashthapower.in/default-generator.jpg",
                        alt: "Kirloskar Generator - Best in Chennai"
                    }
                ]
        },
        canonical: `https://sashthapower.in/generator/${id}`
    };

}

export default async function Page({params}) {
    const {id} =   params;
    const firestore = getFirestore();

    const docRef = firestore
        .collection("generator")
        .doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
        return <p>Document not found</p>;
    }

    const data = docSnap.data(); // Get document data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data.metaData.metaTitle,
        "description": data.metaData.metaDescription,
        "image": data.images
            ? data.images[0].src
            : "https://sashthapower.in/default-generator.jpg",
        "brand": {
            "@type": "Brand",
            "name": "Sashtha Power Services"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": data.price || "Contact for price",
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <ul>
            <Head>
                {/* <title>{data.metaData.metaTitle}</title>
                <meta name="description" content={data.metaData.metaDescription}/>
                <meta name="keywords" content={data.metaData.metaKeywords}/>
                <link rel="canonical" href={`https://sashthapower.in/generator/${id}`}/>
                <Script
                    id="structured-data"
                    type="application/ld+json"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData)
                    }}
                /> */}
            </Head>
            <li>{JSON.stringify(data)}</li>
        </ul>
    );
}
