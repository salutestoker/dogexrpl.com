import Head from "next/head";
import { Bebas_Neue } from "next/font/google";
import {FullScreenVideo} from "@/components/FullScreenVideo";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import {Cards} from "@/components/Cards";
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Or use fetch


const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {

  // const currentYear = new Date().getFullYear();

  const [data, setData] = useState(null); // State for fetched data
  const [loading, setLoading] = useState(true); // State for loading
  const [price, setPrice] = useState('');
  const [mkcap, setMkCap] = useState('');
  const [priceChange1, setPriceChange1] = useState('');
  const [priceChange6, setPriceChange6] = useState('');
  const [priceChange24, setPriceChange24] = useState('');
  const [error, setError] = useState(null); // State for errors
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleLoad = () => {
    setIframeLoaded(true);
  };

  // Function to fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.dexscreener.com/latest/dex/tokens/444f474500000000000000000000000000000000.rp4gxygxpm2ydnlgidehrrkfuaaufszaca'); // Replace with your API
      const fetchedData = response.data; // Save fetched data locally
      setData(fetchedData); // Update data state

      setPrice(fetchedData?.pairs?.[0]?.priceNative || 'N/A')
      setMkCap(fetchedData?.pairs?.[0]?.marketCap || 'N/A')
      setPriceChange1(fetchedData?.pairs?.[0]?.priceChange?.h1 || 'N/A')
      setPriceChange6(fetchedData?.pairs?.[0]?.priceChange?.h6 || 'N/A')
      setPriceChange24(fetchedData?.pairs?.[0]?.priceChange?.h24 || 'N/A')

      // setPrice(fetchedData?.pairs?.[0]?.price || 'N/A')
      setError(null); // Reset error state
    } catch (err) {
      setError(err.message || 'Something went wrong'); // Handle errors
    } finally {
      setLoading(false); // End loading state
    }
  };


  useEffect(() => {
    fetchData(); // Fetch data immediately on mount

    // Set up interval to refetch data every 5 minutes
    const intervalId = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures setup happens only on mount


  return (
    <>
      <Head>
        <title>DOGE(XRPL) | Department of Government Efficiency on $XRP</title>
        <meta name="description"
              content="Department of Government Efficiency (D.O.G.E.) on $XRP | Not affiliated with @DOGE"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="DOGE (XRPL) | Department of Government Efficiency on $XRP"/>
        <meta property="og:url" content="https://dogexrpl.com"/>
        <meta property="og:image" content="/dogexrpl-open-graph.jpg"/>
        <meta property="og:description"
              content="Department of Government Efficiency (D.O.G.E.) on $XRP | Not affiliated with @DOGE"/>
        <meta
          name="twitter:widgets:autoload"
          content="on"/>
        <link rel="icon" href="/favicons/favicon.ico"/>
        <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96"/>
        <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg"/>
        <link rel="shortcut icon" href="/favicons/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"/>
        <link rel="manifest" href="/favicons/site.webmanifest"/>
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content="DOGE(XRPL) | Department of Government Efficiency on $XRP"/>
        <meta name="twitter:site" content="@dogexrpl"/>
        <meta name="twitter:image" content="/dogexrpl-open-graph.jpg"/>
        <meta name="twitter:description"
              content="Department of Government Efficiency (D.O.G.E.) on $XRP | Not affiliated with @DOGE"/>
        <meta name="twitter:image:alt" content="@DOGEXRPL"/>
      </Head>
      <div className={bebasNeue.className}>

        <div className={styles.banner}>
          <Image width="1120" height="120" src="/header-banner.jpg" alt=""/>
        </div>

        <FullScreenVideo/>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.header__inner}>
            <Image className={styles.header__logo} width="192" height="200" src="/dogexrpl-logo.png" alt=""/>
            <div className={styles.header__animate}>
              <div className={styles.header__items}>
                <ul>
                  <li className="mktcap"><span>MktCap:</span> ${mkcap.toLocaleString()} <sup>USD</sup></li>
                  <li className="mktcap"><span>24hr:</span> {priceChange24} <sup>%</sup></li>
                </ul>
                <ul>
                  <li className="price"><span>Price:</span> ${price} <sup>USD</sup></li>
                  <li>
                    <span>Social:</span>
                    <a target="_blank" href="https://x.com/dogexrpl">
                      <img src="/icon-x.svg" alt=""/>
                    </a>
                    <a target="_blank" href="https://t.me/XRPDepartmentOfGovEfficiency">
                      <img src="/icon-telegram.svg" alt=""/>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.memes}>
          <img src="/mountain-vector-bg.svg" alt=""/>
          <div className={styles['twitter-timeline']}>
            <div className={styles['twitter-timeline__inner']}>
              <div className={styles['twitter-timeline__column']}>
                <a className="twitter-timeline" href="https://twitter.com/DOGE" data-chrome="nofooter noborders"
                   data-width="600px" data-height="700">Tweets by @DOGE</a>
                <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
              </div>
              <div className={styles['twitter-timeline__column']}>
                <img src="/doge-meme4@2x.jpg" alt=""/>
              </div>
            </div>
          </div>

          {/* DEBT CLOCK */}

          <div className={iframeLoaded ? styles['debt-clock'] : styles['debt-clock--hidden']}>

              <iframe onLoad={handleLoad} src="https://usdebtclock.org" frameBorder="0"></iframe>

          </div>


          {/* MEMES */}
          <Cards/>
        </div>

        <div className={styles['footer']}>
          <p>&copy;Copyright <a href="https://x.com/dogexrpl" target="_blank">@DogeXRPL</a> 2025 | <span>in collaboration with <a
            href="https://riptarded.com" target="_blank">$RIPTARD</a> on XRPL</span></p>
        </div>

      </div>
    </>
  );
}
