import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogEntry {
  timestamp: string;
  level: "info" | "warn" | "debug" | "success";
  message: string;
}

const mockLogs: LogEntry[] = [
  { timestamp: "2024-01-18T10:45:32.456Z", level: "info", message: "Initializing multi-agent orchestration..." },
  { timestamp: "2024-01-18T10:45:32.891Z", level: "success", message: "Planner Agent activated successfully" },
  { timestamp: "2024-01-18T10:45:33.123Z", level: "debug", message: "Analyzing project requirements from specification..." },
  { timestamp: "2024-01-18T10:45:33.567Z", level: "info", message: "Generating architecture blueprint..." },
  { timestamp: "2024-01-18T10:45:34.012Z", level: "debug", message: "Evaluating component dependencies: React, TypeScript, TailwindCSS" },
  { timestamp: "2024-01-18T10:45:34.456Z", level: "info", message: "Coder Agent processing implementation queue..." },
  { timestamp: "2024-01-18T10:45:34.891Z", level: "success", message: "Generated 12 component files with type definitions" },
  { timestamp: "2024-01-18T10:45:35.234Z", level: "debug", message: "Applying code optimization patterns..." },
  { timestamp: "2024-01-18T10:45:35.678Z", level: "info", message: "Reviewer Agent scanning for potential issues..." },
  { timestamp: "2024-01-18T10:45:36.012Z", level: "warn", message: "Minor accessibility improvements suggested in NavComponent" },
  { timestamp: "2024-01-18T10:45:36.456Z", level: "info", message: "Optimizer Agent analyzing performance metrics..." },
  { timestamp: "2024-01-18T10:45:36.891Z", level: "success", message: "Bundle size reduced by 23% after tree-shaking" },
];

interface ReasoningConsoleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ReasoningConsole = ({ isOpen, onToggle }: ReasoningConsoleProps) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getLevelColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "info":
        return "text-primary";
      case "warn":
        return "text-amber-400";
      case "debug":
        return "text-muted-foreground";
      case "success":
        return "text-emerald-400";
    }
  };

  const getLevelLabel = (level: LogEntry["level"]) => {
    return `[${level.toUpperCase().padEnd(7)}]`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            height: isMinimized ? "auto" : 320
          }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl z-50"
        >
          <div 
            className="glass-card overflow-hidden"
            style={{
              boxShadow: "0 0 40px hsl(183 100% 50% / 0.15), 0 0 80px hsl(275 100% 50% / 0.1)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-primary/10 bg-obsidian-light/50">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Reasoning Trace
                </span>
                <span className="text-xs text-muted-foreground">
                  — Real-time Analysis
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded hover:bg-muted/50 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button
                  className="p-1.5 rounded hover:bg-muted/50 transition-colors"
                >
                  <Square className="w-3 h-3 text-muted-foreground" />
                </button>
                <button
                  onClick={onToggle}
                  className="p-1.5 rounded hover:bg-destructive/20 hover:text-destructive transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            </div>

            {/* Console Content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 260 }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 h-full overflow-y-auto custom-scrollbar bg-obsidian/80">
                    <div className="space-y-1.5">
                      {mockLogs.map((log, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="console-log flex items-start gap-2"
                        >
                          <span className="text-muted-foreground/60 shrink-0">
                            {formatTime(log.timestamp)}
                          </span>
                          <span className={cn("shrink-0", getLevelColor(log.level))}>
                            {getLevelLabel(log.level)}
                          </span>
                          <span className="text-foreground/90">{log.message}</span>
                        </motion.div>
                      ))}
                      
                      {/* Blinking Cursor */}
                      <div className="flex items-center gap-2 console-log">
                        <span className="text-muted-foreground/60">
                          {formatTime(new Date().toISOString())}
                        </span>
                        <span className="text-primary">[ACTIVE ]</span>
                        <span className="text-foreground/90">Awaiting next instruction</span>
                        <motion.span
                          className="inline-block w-2 h-4 bg-primary"
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReasoningConsole;
