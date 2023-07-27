import React, { useEffect } from 'react';

const TraditionalCurrencyChart = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        "width": 800, // Adjust the width as needed
        "height": 500, // Adjust the height as needed
        "symbol": "FX_IDC:USDINR",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "in",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_9bd29"
      });
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup function to remove the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container" style={{ width: "100%", height: "500px" }}>
      {/* Adjust the height as needed */}
      <div id="tradingview_9bd29"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TraditionalCurrencyChart;
