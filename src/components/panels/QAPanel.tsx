import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, XCircle, ShieldCheck, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface QAItem {
  id: string;
  name: string;
  status: "passed" | "warning" | "failed";
  message: string;
  duration: string;
}

const qaItems: QAItem[] = [
  { id: "1", name: "Type Safety Check", status: "passed", message: "All types are properly defined", duration: "0.8s" },
  { id: "2", name: "Security Scan", status: "passed", message: "No vulnerabilities detected", duration: "2.4s" },
  { id: "3", name: "Code Coverage", status: "warning", message: "Coverage at 78% (target: 80%)", duration: "1.2s" },
  { id: "4", name: "Performance Audit", status: "passed", message: "All metrics within threshold", duration: "3.1s" },
  { id: "5", name: "Accessibility Check", status: "warning", message: "2 minor ARIA issues found", duration: "0.9s" },
  { id: "6", name: "Dependency Audit", status: "passed", message: "All packages up to date", duration: "1.5s" },
];

const QAPanel = () => {
  const passedCount = qaItems.filter(i => i.status === "passed").length;
  const warningCount = qaItems.filter(i => i.status === "warning").length;
  const failedCount = qaItems.filter(i => i.status === "failed").length;
  const qualityScore = Math.round((passedCount / qaItems.length) * 100);

  const getStatusIcon = (status: QAItem["status"]) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />;
    }
  };

  return (
    <div className="h-full glass-card-hover p-6 overflow-auto custom-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quality Assurance Audit</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Automated code quality and security analysis
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-400">Quality: {qualityScore}%</span>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Passed", value: passedCount, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Warnings", value: warningCount, color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "Failed", value: failedCount, color: "text-red-400", bg: "bg-red-500/10" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className={cn("glass-card p-4 rounded-lg text-center", stat.bg)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Progress Bars */}
      <div className="glass-card p-4 rounded-lg mb-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted-foreground">Code Coverage</span>
              <span className="text-foreground">78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted-foreground">Test Pass Rate</span>
              <span className="text-foreground">96%</span>
            </div>
            <Progress value={96} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted-foreground">Documentation</span>
              <span className="text-foreground">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
        </div>
      </div>
      
      {/* QA Items List */}
      <div className="space-y-2">
        {qaItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="glass-card p-4 rounded-lg flex items-center justify-between hover:border-primary/30 transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(item.status)}
              <div>
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.message}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{item.duration}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QAPanel;
