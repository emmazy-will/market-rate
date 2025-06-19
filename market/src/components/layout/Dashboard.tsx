import React, { useState } from 'react';
import { 
  useStockData, useMarketIndices, useCurrencyPairs, 
  mockStocks, mockIndices, mockCurrencies, mockNews,
  generatePriceHistory 
} from '@/utils/stocksApi';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StockCard } from '@/components/stocks/StockCard';
import { StockChart } from '@/components/stocks/StockChart';
import { MarketOverview } from '@/components/markets/MarketOverview';
import { CurrencyExchange } from '@/components/currencies/CurrencyExchange';
import { NewsCard } from '@/components/news/NewsCard';
import { StatsCard } from '@/components/ui/StatsCard';
import { BarChart3, TrendingDown, TrendingUp, Wallet2 } from 'lucide-react';

export function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedStock, setSelectedStock] = useState(mockStocks[0]);
  
  // Use our hooks to get real-time mock data
  const stocks = useStockData(mockStocks);
  const indices = useMarketIndices(mockIndices);
  const currencies = useCurrencyPairs(mockCurrencies);
  
  // Generate chart data for the selected stock
  const selectedStockHistory = generatePriceHistory(30, selectedStock.price, 2);
  
  // Generate chart data for stock cards
  const stocksWithHistory = stocks.map(stock => {
    return {
      ...stock,
      priceHistory: generatePriceHistory(30, stock.price, 2)
    };
  });
  
  // Calculate market statistics
  const gainers = stocks.filter(stock => stock.changePercent > 0);
  const losers = stocks.filter(stock => stock.changePercent < 0);
  
  const topGainer = [...stocks].sort((a, b) => b.changePercent - a.changePercent)[0];
  const topLoser = [...stocks].sort((a, b) => a.changePercent - b.changePercent)[0];
  
  const totalMarketCap = stocks.reduce((sum, stock) => sum + stock.marketCap, 0);
  const totalVolume = stocks.reduce((sum, stock) => sum + stock.volume, 0);
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Fixed Sidebar */}
        <div className={`fixed h-[calc(100vh-4rem)] top-16 left-0 z-10 ${isSidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
          <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        </div>
        
        {/* Scrollable Main Content */}
        <main 
          className={`flex-1 transition-all duration-300 overflow-y-auto ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}
          style={{ height: 'calc(100vh - 4rem)' }}
        >
          <div className="container max-w-full p-4 lg:p-6 animate-fade-in">
            <h1 className="text-2xl font-bold mb-6">Market Dashboard</h1>
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-slide-up" style={{ '--delay': '100ms' } as React.CSSProperties}>
              <StatsCard 
                title="Market Cap" 
                value="$13.42T"
                trend={0.47}
                icon={<Wallet2 />}
                className="bg-primary/5 h-full"
              />
              <StatsCard 
                title="Trading Volume" 
                value="487.32M"
                description="Today's volume"
                icon={<BarChart3 />}
                className="bg-primary/5 h-full"
              />
              <StatsCard 
                title="Top Gainer" 
                value={topGainer.symbol}
                trend={topGainer.changePercent}
                trendLabel={topGainer.name}
                icon={<TrendingUp />}
                className="bg-success/5 h-full"
              />
              <StatsCard 
                title="Top Loser" 
                value={topLoser.symbol}
                trend={topLoser.changePercent}
                trendLabel={topLoser.name}
                icon={<TrendingDown />}
                className="bg-danger/5 h-full"
              />
            </div>
            
            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left column - Stock list */}
              <div className="lg:col-span-1 space-y-4 animate-slide-up" style={{ '--delay': '200ms' } as React.CSSProperties}>
                <h2 className="text-xl font-semibold">Watchlist</h2>
                <div className="grid gap-4">
                  {stocksWithHistory.slice(0, 5).map((stock) => (
                    <StockCard 
                      key={stock.symbol} 
                      stock={stock} 
                      priceHistory={stock.priceHistory}
                      onClick={() => setSelectedStock(stock)}
                      isSelected={selectedStock.symbol === stock.symbol}
                      className="h-full"
                    />
                  ))}
                </div>
              </div>
              
              {/* Middle column - Chart and news */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-lg shadow-sm p-4 h-[400px]">
                  <StockChart 
                    symbol={selectedStock.symbol} 
                    name={selectedStock.name} 
                    currentPrice={selectedStock.price}
                    volatility={2.5}
                  />
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 min-h-[300px]">
                  <NewsCard news={mockNews} className="h-full" />
                </div>
              </div>
              
              {/* Right column - Markets and currencies */}
              <div className="lg:col-span-1 space-y-4 animate-slide-up" style={{ '--delay': '400ms' } as React.CSSProperties}>
                <div className="bg-white rounded-lg shadow-sm p-4 h-[350px]">
                  <MarketOverview indices={indices} className="h-full" />
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 h-[350px]">
                  <CurrencyExchange currencies={currencies} className="h-full" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}