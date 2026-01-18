import { Brain, Terminal, Settings, Bell } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
  onConsoleToggle: () => void;
  isConsoleOpen: boolean;
}

const Header = ({ onConsoleToggle, isConsoleOpen }: HeaderProps) => {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-primary/10 glass-card rounded-none">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div 
            className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30"
            style={{
              boxShadow: "0 0 20px hsl(183 100% 50% / 0.2)",
            }}
          >
            <Brain className="w-5 h-5 text-primary" />
          </div>
        </motion.div>
        
        <div>
          <h1 className="text-lg font-semibold gradient-text-mixed">
            DevMind AI
          </h1>
          <p className="text-[10px] text-muted-foreground -mt-0.5 tracking-wider uppercase">
            Multi-Agent System
          </p>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-2">
        <motion.button
          onClick={onConsoleToggle}
          className={`p-2.5 rounded-lg transition-all duration-300 ${
            isConsoleOpen 
              ? "bg-primary/20 text-primary border border-primary/30" 
              : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={isConsoleOpen ? {
            boxShadow: "0 0 15px hsl(183 100% 50% / 0.2)",
          } : {}}
        >
          <Terminal className="w-4.5 h-4.5" />
        </motion.button>
        
        <motion.button
          className="p-2.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
        </motion.button>
        
        <motion.button
          className="p-2.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-4.5 h-4.5" />
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
