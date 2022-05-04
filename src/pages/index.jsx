import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

import logo from "../../public/images/Logo-dark.png";

import Map from "../Components/Map/Map";

export default function Home({ clients }) {
    console.log("process.env");
    console.log(process.env.NODE_ENV);
    return (
        <div>
            <div style={{ width: "min-content", margin: "0 auto" }}>
                <a href="https://peakleads.io" target="_blank" rel="noopener noreferrer">
                    <div className={styles.imageWrapper}>
                        <Image src={logo} layout="fill" objectFit="contain" alt="PeakLeads Logo" />
                    </div>
                </a>
            </div>

            <div className={styles.mapWrapper}>
                <Map clients={clients} />
            </div>
        </div>
    );
}

// This gets called on every request
export async function getServerSideProps() {
    let domain = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    // Fetch data from external API
    const res = await fetch(`${domain}/api/clients`);
    let clients = await res.json();

    clients = clients.filter((client) => "Latitude" in client && "Longitude" in client);

    return { props: { clients } };
}
