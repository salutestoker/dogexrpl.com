
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Or use fetch
import './Tokenomics.scss';

function Tokenomics () {
    const [data, setData] = useState(null); // State for fetched data
    const [loading, setLoading] = useState(true); // State for loading
    const [price, setPrice] = useState('');
    const [mkcap, setMkCap] = useState('');
    const [priceChange1, setPriceChange1] = useState('');
    const [priceChange6, setPriceChange6] = useState('');
    const [priceChange24, setPriceChange24] = useState('');
    const [error, setError] = useState(null); // State for errors

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


    const ticker = document.querySelector('.ticker');
    const tickerItems = document.querySelectorAll('.ticker-item');

    setTimeout(function (){
        cloneTickerItems();
    }, 500)


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

    function cloneTickerItems() {
        tickerItems.forEach(item => {
            const clone = item.cloneNode(true);
            ticker.appendChild(clone);
        });
    }

    return (
        <div className="ticker">
            <div className="ticker-item">
                <div className="name">
                    <i className="riptard-ticker">$RIPTARD</i>
                    <span> ON XRPL</span>
                </div>
                <div className="price">
                    <span className="label">PRICE: </span> <span className="value">{price}</span> <span
                    className="currency">XRP </span>
                </div>
                <div className="mkcap">
                    <span className="label">MKT CAP: </span> <span className="currency">$</span><span
                    className="value">{mkcap.toLocaleString()}</span>
                </div>
                <div className="change earn">
                    <span className="label">1hr</span>
                    <div className={priceChange1 < 0 ? 'down' : undefined}>{priceChange1 > 0 ? '+' : ''}{priceChange1}%</div>
                </div>

                <div className="change earn">
                    <span className="label">6hrs</span>
                    <div className={priceChange6 < 0 ? 'down' : undefined}>{priceChange6 > 0 ? '+' : ''}{priceChange6}%</div>
                </div>
                <div className="change earn">
                    <span className="label">24hrs</span>
                    <div className={priceChange24 < 0 ? 'down' : undefined}>{priceChange24 > 0 ? '+' : ''}{priceChange24}%</div>
                </div>

            </div>
        </div>
    );
}

export default Tokenomics;