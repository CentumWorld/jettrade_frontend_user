import React,{useEffect,useRef} from 'react'

const TraditionalCurrencyChart = () => {

    const containerRef = useRef();
    let tvScriptLoadingPromise;
    const onLoadScriptRef = useRef();
  
    useEffect(() => {
      const containerId = 'tradingview_9bea0';
      const widgetConfig = {
        width: 980,
        height: 610,
        symbol: 'FX_IDC:USDINR',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'in',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        details: true,
        container_id: containerId,
      };
  
      const createWidget = () => {
        if (document.getElementById(containerId) && 'TradingView' in window) {
          new window.TradingView.widget(widgetConfig);
        }
      };
  
      onLoadScriptRef.current = createWidget;
  
      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;
  
          document.head.appendChild(script);
        });
      }
  
      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());
  
      return () => {
        onLoadScriptRef.current = null;
      };
    }, []);

  return (
    <div className="tradingview-widget-container">
    <div id="tradingview_9bea0" ref={containerRef} />
    <div className="tradingview-widget-copyright">
      <a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank">
        <span className="blue-text">Track all markets on TradingView</span>
      </a>
    </div>
  </div>

  )
}

export default TraditionalCurrencyChart