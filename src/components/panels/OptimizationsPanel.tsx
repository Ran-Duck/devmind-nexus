import { motion } from "framer-motion";
import { Zap, TrendingDown, TrendingUp, Package, Clock, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface Optimization {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  savings: string;
  applied: boolean;
}

const optimizations: Optimization[] = [
  {
    id: "1",
    title: "Tree Shaking Enhancement",
    description: "Remove unused exports from bundle",
    impact: "high",
    savings: "-23% bundle size",
    applied: true,
  },
  {
    id: "2",
    title: "Code Splitting",
    description: "Lazy load non-critical components",
    impact: "high",
    savings: "-18% initial load",
    applied: true,
  },
  {
    id: "3",
    title: "Image Optimization",
    description: "Convert images to WebP format",
    impact: "medium",
    savings: "-45% image size",
    applied: false,
  },
  {
    id: "4",
    title: "Memoization",
    description: "Add useMemo to expensive computations",
    impact: "medium",
    savings: "+15% render speed",
    applied: true,
  },
  {
    id: "5",
    title: "CSS Purging",
    description: "Remove unused Tailwind classes",
    impact: "low",
    savings: "-8% CSS size",
    applied: false,
  },
];

const metrics = [
  { label: "Bundle Size", value: "142kb", change: "-23%", positive: true, icon: Package },
  { label: "First Paint", value: "0.8s", change: "-0.4s", positive: true, icon: Clock },
  { label: "TTI", value: "1.2s", change: "-0.6s", positive: true, icon: Zap },
  { label: "Components", value: "24", change: "+3", positive: false, icon: FileCode },
];

const OptimizationsPanel = () => {
  return (
    <div className="h-full glass-card-hover p-6 overflow-auto custom-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Performance Optimizations</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            AI-powered performance analysis and improvements
          </p>
        </div>
        
        <motion.button
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-sm font-medium text-primary hover:from-primary/30 hover:to-secondary/30 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            boxShadow: "0 0 15px hsl(183 100% 50% / 0.15)",
          }}
        >
          Apply All
        </motion.button>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className="glass-card p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className="w-4 h-4 text-primary" />
              <div className={cn(
                "flex items-center gap-1 text-xs",
                metric.positive ? "text-emerald-400" : "text-amber-400"
              )}>
                {metric.positive ? (
                  <TrendingDown className="w-3 h-3" />
                ) : (
                  <TrendingUp className="w-3 h-3" />
                )}
                {metric.change}
              </div>
            </div>
            <p className="text-xl font-bold text-foreground">{metric.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{metric.label}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Optimization List */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Suggested Optimizations
        </h4>
        
        {optimizations.map((opt, index) => (
          <motion.div
            key={opt.id}
            className={cn(
              "glass-card p-4 rounded-lg flex items-center justify-between transition-all",
              opt.applied ? "border-emerald-500/20" : "hover:border-primary/30"
            )}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                opt.impact === "high" && "bg-emerald-500/10",
                opt.impact === "medium" && "bg-amber-500/10",
                opt.impact === "low" && "bg-muted/30"
              )}>
                <Zap className={cn(
                  "w-5 h-5",
                  opt.impact === "high" && "text-emerald-400",
                  opt.impact === "medium" && "text-amber-400",
                  opt.impact === "low" && "text-muted-foreground"
                )} />
              </div>
              
              <div>
                <p className="text-sm font-medium text-foreground">{opt.title}</p>
                <p className="text-xs text-muted-foreground">{opt.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded",
                opt.impact === "high" && "bg-emerald-500/10 text-emerald-400",
                opt.impact === "medium" && "bg-amber-500/10 text-amber-400",
                opt.impact === "low" && "bg-muted/30 text-muted-foreground"
              )}>
                {opt.savings}
              </span>
              
              {opt.applied ? (
                <span className="text-xs text-emerald-400 font-medium">Applied</span>
              ) : (
                <motion.button
                  className="text-xs text-primary hover:text-primary/80 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OptimizationsPanel;
