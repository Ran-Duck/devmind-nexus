import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, FileCode, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileBlock {
  id: string;
  name: string;
  language: string;
  code: string;
}

const files: FileBlock[] = [
  {
    id: "1",
    name: "AgentOrchestrator.ts",
    language: "typescript",
    code: `export class AgentOrchestrator {
  private agents: Map<string, Agent> = new Map();
  private taskQueue: Task[] = [];
  
  async initialize(): Promise<void> {
    await this.loadAgentConfigs();
    await this.startHealthCheck();
  }
  
  async dispatch(task: Task): Promise<Result> {
    const agent = this.selectOptimalAgent(task);
    return await agent.execute(task);
  }
}`,
  },
  {
    id: "2",
    name: "PlannerAgent.ts",
    language: "typescript",
    code: `export class PlannerAgent extends BaseAgent {
  async analyze(requirements: string[]): Promise<Plan> {
    const context = await this.buildContext();
    const breakdown = this.decomposeRequirements(requirements);
    
    return {
      phases: breakdown.map(b => this.createPhase(b)),
      estimatedTime: this.calculateDuration(breakdown),
      dependencies: this.mapDependencies(breakdown)
    };
  }
}`,
  },
  {
    id: "3",
    name: "CodeGenerator.ts",
    language: "typescript",
    code: `export class CodeGenerator {
  private templates: TemplateEngine;
  
  generate(spec: ComponentSpec): GeneratedCode {
    const structure = this.analyzeStructure(spec);
    const imports = this.resolveImports(structure);
    
    return {
      content: this.templates.render(structure),
      imports,
      tests: this.generateTests(spec)
    };
  }
}`,
  },
];

const ImplementationPanel = () => {
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set(["1"]));
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleFile = (id: string) => {
    setExpandedFiles(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const copyCode = async (id: string, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-full glass-card-hover p-6 overflow-auto custom-scrollbar">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Source Code Implementation</h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          Auto-generated files with intelligent code synthesis
        </p>
      </div>

      <div className="space-y-3">
        {files.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-lg overflow-hidden border border-primary/10 hover:border-primary/30 transition-colors"
          >
            {/* File Header */}
            <button
              onClick={() => toggleFile(file.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: expandedFiles.has(file.id) ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </motion.div>
                <FileCode className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{file.name}</span>
              </div>
              
              <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                {file.language}
              </span>
            </button>
            
            {/* Code Content */}
            <AnimatePresence>
              {expandedFiles.has(file.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative border-t border-primary/10">
                    {/* Copy Button */}
                    <button
                      onClick={() => copyCode(file.id, file.code)}
                      className="absolute top-3 right-3 p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors z-10"
                    >
                      {copiedId === file.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                    
                    {/* Code Block */}
                    <pre className="p-4 overflow-x-auto custom-scrollbar bg-obsidian/50">
                      <code className="font-mono text-sm text-foreground/90">
                        {file.code.split('\n').map((line, lineIndex) => (
                          <div key={lineIndex} className="flex">
                            <span className="select-none w-8 text-muted-foreground/40 text-right mr-4">
                              {lineIndex + 1}
                            </span>
                            <span className={cn(
                              line.includes('export') && "text-secondary",
                              line.includes('async') && "text-primary",
                              line.includes('await') && "text-primary",
                              line.includes('return') && "text-secondary",
                              line.includes('//') && "text-muted-foreground",
                            )}>
                              {line || ' '}
                            </span>
                          </div>
                        ))}
                      </code>
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImplementationPanel;
