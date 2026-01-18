import { useState } from "react";
import Header from "@/components/Header";
import AgentWorkflow from "@/components/AgentWorkflow";
import MainTabs from "@/components/MainTabs";
import ReasoningConsole from "@/components/ReasoningConsole";
import StatusBar from "@/components/StatusBar";

const Index = () => {
  const [activeAgent, setActiveAgent] = useState("planner");
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header 
        onConsoleToggle={() => setIsConsoleOpen(!isConsoleOpen)} 
        isConsoleOpen={isConsoleOpen}
      />
      
      {/* Main Layout */}
      <div className="flex-1 flex pb-10">
        {/* Sidebar - Agent Workflow */}
        <aside className="w-48 border-r border-primary/10 bg-sidebar shrink-0">
          <AgentWorkflow 
            activeAgent={activeAgent} 
            onAgentClick={setActiveAgent}
          />
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-6 min-w-0 overflow-hidden">
          <MainTabs activeAgent={activeAgent} />
        </main>
      </div>
      
      {/* Floating Reasoning Console */}
      <ReasoningConsole 
        isOpen={isConsoleOpen} 
        onToggle={() => setIsConsoleOpen(false)}
      />
      
      {/* Status Bar */}
      <StatusBar />
    </div>
  );
};

export default Index;
