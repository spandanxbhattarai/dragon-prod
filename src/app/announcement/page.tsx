import React from "react";
import AnnouncementDetail from "@/components/announcement/AnnouncementDetail";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


export default async function AnnouncementPage() {

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <AnnouncementDetail id={"1"} />
            </main>
            <Footer />
        </div>
    );
}