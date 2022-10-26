import Head from "next/head";
import Image from "next/image";
import HomeHoma from "../components/Home";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Frontend Dev CS</title>
      </Head>

      <main>
        <NavBar />
        <HomeHoma />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
