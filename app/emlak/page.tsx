"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ScrollUp from '@/components/Common/ScrollUp';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Video from '@/components/Video';
import Brands from '@/components/Brands';
import AboutSectionOne from '@/components/About/AboutSectionOne';
import AboutSectionTwo from '@/components/About/AboutSectionTwo';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import { Metadata } from "next";
import dynamic from 'next/dynamic';


const ClientSideComponent = dynamic(() => import('@/components/ClientSideComponents'), { ssr: false });

// export const metadata: Metadata = {
//     title: "Free Next.js Template for Startup and SaaS",
//     description: "This is Home for Startup Nextjs Template",
//     // other metadata
//   };

export default function EmlakListesi() {
    const [emlaklar, setEmlaklar] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/emlak/')
            .then(response => response.json())
            .then(data => {
                setEmlaklar(data);
            })
            .catch(error => console.error('Hata:', error));
    }, []);
    // Emlaklar yüklenene kadar bir yükleme göstergesi veya placeholder göster
    if (emlaklar === null) {
        return <div>Yükleniyor...</div>;
    }
    return (
        <>
            <ScrollUp />
            <Hero />
            <Features />
            <Video />
            <Brands />
            <AboutSectionOne />
            <AboutSectionTwo />
            <Testimonials />
            <Pricing />
            <Blog />
            <Contact />
 
            <ClientSideComponent />
            <div>
                <h1>Emlak Listesi</h1>
                <ul>
                    {emlaklar.map(emlak => (
                        <li key={emlak.id}>
                            <Link href={`/emlak/${emlak.id}`}>
                                ID: {emlak.id}, Konum: {emlak.location}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
