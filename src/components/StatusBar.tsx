import { motion } from "framer-motion";
import { Activity, Cpu, HardDrive, Wifi } from "lucide-react";

const StatusBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 glass-card border-t border-primary/10 flex items-center justify-between px-6 z-40">
      {/* Left - System Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <motion.div
            className="status-dot status-dot-active"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs font-medium text-foreground">
            System Status:
          </span>
          <span className="text-xs text-primary">
            All Agents Active
          </span>
        </div>
        
        <div className="h-4 w-px bg-border" />
        
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Activity className="w-3.5 h-3.5" />
          <span className="text-xs">Optimizing...</span>
        </div>
      </div>
      
      {/* Right - Metrics */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Cpu className="w-3.5 h-3.5 text-primary/70" />
          <span className="text-xs">CPU: 42%</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <HardDrive className="w-3.5 h-3.5 text-secondary/70" />
          <span className="text-xs">Memory: 2.4GB</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Wifi className="w-3.5 h-3.5 text-emerald-400/70" />
          <span className="text-xs">Connected</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
