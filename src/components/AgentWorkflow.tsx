import { Lightbulb, Code2, Search, Zap } from "lucide-react";
import AgentNode from "./AgentNode";
import { motion } from "framer-motion";

interface AgentWorkflowProps {
  activeAgent: string;
  onAgentClick: (agent: string) => void;
}

const agents = [
  { id: "planner", name: "Planner", icon: Lightbulb },
  { id: "coder", name: "Coder", icon: Code2 },
  { id: "reviewer", name: "Reviewer", icon: Search },
  { id: "optimizer", name: "Optimizer", icon: Zap },
];

const AgentWorkflow = ({ activeAgent, onAgentClick }: AgentWorkflowProps) => {
  const activeIndex = agents.findIndex((a) => a.id === activeAgent);

  return (
    <div className="flex flex-col items-center py-8 px-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
        Agent Workflow
      </h2>
      
      <div className="relative flex flex-col items-center">
        {/* Agent Nodes with Connecting Lines */}
        {agents.map((agent, index) => (
          <div key={agent.id} className="relative flex flex-col items-center">
            {/* Connecting Line to Next Node */}
            {index < agents.length - 1 && (
              <div className="absolute top-[100px] left-1/2 -translate-x-1/2 flex flex-col items-center">
                {/* Vertical Line */}
                <div 
                  className="w-0.5 h-6 relative overflow-hidden"
                  style={{
                    background: index < activeIndex 
                      ? "linear-gradient(180deg, hsl(183 100% 50%), hsl(275 100% 50%))"
                      : "linear-gradient(180deg, hsl(183 100% 50% / 0.3), hsl(275 100% 50% / 0.2))",
                    boxShadow: index < activeIndex 
                      ? "0 0 8px hsl(183 100% 50% / 0.6)"
                      : "none",
                  }}
                >
                  {/* Flowing Particle */}
                  {index < activeIndex && (
                    <motion.div
                      className="absolute w-1.5 h-1.5 -left-0.5 rounded-full bg-primary"
                      style={{
                        boxShadow: "0 0 6px hsl(183 100% 50%)",
                      }}
                      animate={{ y: [0, 24] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                </div>
              </div>
            )}
            
            <div className="mb-8">
              <AgentNode
                icon={agent.icon}
                name={agent.name}
                isActive={activeAgent === agent.id}
                onClick={() => onAgentClick(agent.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentWorkflow;
