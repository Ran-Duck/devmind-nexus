import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Network, Code, ShieldCheck, Gauge } from "lucide-react";
import ArchitecturePanel from "./panels/ArchitecturePanel";
import ImplementationPanel from "./panels/ImplementationPanel";
import QAPanel from "./panels/QAPanel";
import OptimizationsPanel from "./panels/OptimizationsPanel";

const tabs = [
  { id: "architecture", label: "Architecture", icon: Network },
  { id: "implementation", label: "Implementation", icon: Code },
  { id: "qa", label: "QA Audit", icon: ShieldCheck },
  { id: "optimizations", label: "Optimizations", icon: Gauge },
];

interface MainTabsProps {
  activeAgent: string;
}

const MainTabs = ({ activeAgent }: MainTabsProps) => {
  const [activeTab, setActiveTab] = useState("architecture");

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="glass-card w-full justify-start gap-1 p-1.5 rounded-xl border-primary/10">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/10 data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:bg-muted/30"
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              
              {/* Active Indicator Glow */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-lg border border-primary/30"
                  style={{
                    boxShadow: "0 0 15px hsl(183 100% 50% / 0.2), inset 0 0 15px hsl(183 100% 50% / 0.05)",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1 mt-4 min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <TabsContent value="architecture" className="m-0 h-full">
                <ArchitecturePanel activeAgent={activeAgent} />
              </TabsContent>
              <TabsContent value="implementation" className="m-0 h-full">
                <ImplementationPanel />
              </TabsContent>
              <TabsContent value="qa" className="m-0 h-full">
                <QAPanel />
              </TabsContent>
              <TabsContent value="optimizations" className="m-0 h-full">
                <OptimizationsPanel />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
};

export default MainTabs;
