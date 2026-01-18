import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentNodeProps {
  icon: LucideIcon;
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const AgentNode = ({ icon: Icon, name, isActive, onClick }: AgentNodeProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative group flex flex-col items-center gap-2 focus:outline-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Outer Glow Container */}
      <div className="relative">
        {/* Pulsing Glow Ring for Active */}
        {isActive && (
          <motion.div
            className="absolute -inset-2 rounded-2xl"
            style={{
              background: "radial-gradient(circle, hsl(183 100% 50% / 0.3), transparent 70%)",
            }}
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        
        {/* Hexagon Shape */}
        <div
          className={cn(
            "relative w-20 h-[88px] transition-all duration-500",
            isActive ? "drop-shadow-[0_0_15px_hsl(183,100%,50%)]" : ""
          )}
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        >
          {/* Border Layer */}
          <div 
            className={cn(
              "absolute inset-0 transition-all duration-500",
              isActive 
                ? "bg-gradient-to-b from-primary via-primary/70 to-secondary" 
                : "bg-gradient-to-b from-primary/30 to-secondary/20 group-hover:from-primary/50 group-hover:to-secondary/30"
            )}
          />
          
          {/* Inner Fill */}
          <div 
            className="absolute inset-[2px] flex items-center justify-center transition-all duration-500"
            style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              background: isActive 
                ? "linear-gradient(180deg, hsl(220 25% 12%) 0%, hsl(220 30% 8%) 100%)"
                : "hsl(220 30% 8%)",
            }}
          >
            <Icon 
              className={cn(
                "w-7 h-7 transition-all duration-300",
                isActive 
                  ? "text-primary drop-shadow-[0_0_10px_hsl(183,100%,50%)]" 
                  : "text-muted-foreground group-hover:text-primary/70"
              )} 
            />
          </div>
        </div>
      </div>
      
      {/* Agent Name */}
      <span 
        className={cn(
          "text-xs font-medium tracking-wide transition-all duration-300",
          isActive 
            ? "text-primary drop-shadow-[0_0_5px_hsl(183,100%,50%)]" 
            : "text-muted-foreground group-hover:text-foreground"
        )}
      >
        {name}
      </span>
    </motion.button>
  );
};

export default AgentNode;
