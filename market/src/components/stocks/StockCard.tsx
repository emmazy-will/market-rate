import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon, BarChart3Icon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import { Stock, formatCurrency, formatPercentage, formatNumber, formatDate } from '@/utils/stocksApi';
import { Sparkline } from '@/components/stocks/Sparkline';
import { cn } from '@/lib/utils';

interface StockCardProps {
  stock: Stock;
  priceHistory?: number[];
  className?: string;
  onClick?: () => void;
}

export function StockCard({ stock, priceHistory, className, onClick }: StockCardProps) {
  const isPositive = stock.change >= 0;
  const isNeutral = stock.change === 0;
  
  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-xl",
        "bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-md border-0",
        "hover:from-card/100 hover:to-card/90",
        isPositive && "hover:shadow-green-500/20",
        !isPositive && !isNeutral && "hover:shadow-red-500/20",
        onClick ? "cursor-pointer" : "",
        "w-full", // Ensure full width on mobile
        className
      )}
      onClick={onClick}
    >
      {/* Animated background gradient */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        "bg-gradient-to-br",
        isPositive ? "from-green-500/5 to-emerald-500/5" : "from-red-500/5 to-pink-500/5"
      )} />
      
      {/* Top accent border */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 transition-all duration-300",
        isPositive ? "bg-gradient-to-r from-green-400 to-emerald-500" : 
        isNeutral ? "bg-gradient-to-r from-gray-400 to-slate-500" :
        "bg-gradient-to-r from-red-400 to-pink-500"
      )} />

      <CardHeader className="flex flex-col sm:flex-row items-start justify-between pb-2 sm:pb-3 relative z-10">
        <div className="space-y-1 sm:space-y-2 flex-1 w-full">
          <div className="flex items-center gap-2 justify-between sm:justify-start">
            <CardTitle className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              {stock.symbol}
            </CardTitle>
            <div className={cn(
              "flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-300",
              isPositive ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
              isNeutral ? "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400" :
              "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
            )}>
              {isPositive ? <TrendingUpIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : 
               isNeutral ? <BarChart3Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> :
               <TrendingDownIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground/90 line-clamp-2 leading-relaxed">
            {stock.name}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4 relative z-10">
        {/* Price and Change Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-0">
          <div className="space-y-1 flex-1">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
              {formatCurrency(stock.price)}
            </div>
            <div className="flex items-center gap-1">
              <div className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-300",
                isPositive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
                isNeutral ? "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300" :
                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
              )}>
                {isPositive ? 
                  <ArrowUpIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : 
                  isNeutral ? null :
                  <ArrowDownIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                }
                <span className="font-semibold">
                  {formatCurrency(Math.abs(stock.change))}
                </span>
                <span className="text-xs opacity-90">
                  ({formatPercentage(stock.changePercent)})
                </span>
              </div>
            </div>
          </div>
          
          {/* Sparkline Chart */}
          <div className="h-12 w-20 sm:h-16 sm:w-24 flex-shrink-0 self-end">
            {priceHistory && priceHistory.length > 0 && (
              <Sparkline 
                data={priceHistory} 
                color={isPositive ? 'rgb(34, 197, 94)' : isNeutral ? 'rgb(107, 114, 128)' : 'rgb(239, 68, 68)'}
                className="opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-border/50">
          <div className="flex justify-between sm:flex-col sm:space-y-1 sm:text-center">
            <div className="text-xs font-medium text-muted-foreground/80 uppercase tracking-wide">
              Volume
            </div>
            <div className="text-sm font-semibold">
              {formatNumber(stock.volume)}
            </div>
          </div>
          <div className="flex justify-between sm:flex-col sm:space-y-1 sm:text-center">
            <div className="text-xs font-medium text-muted-foreground/80 uppercase tracking-wide">
              Market Cap
            </div>
            <div className="text-sm font-semibold">
              {formatNumber(stock.marketCap)}
            </div>
          </div>
          <div className="flex justify-between sm:flex-col sm:space-y-1 sm:text-center">
            <div className="text-xs font-medium text-muted-foreground/80 uppercase tracking-wide">
              Updated
            </div>
            <div className="text-sm font-semibold">
              {formatDate(stock.lastUpdated)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}