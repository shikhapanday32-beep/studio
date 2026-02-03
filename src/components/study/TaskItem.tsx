"use client";

import type { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Book, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type TaskItemProps = {
  task: Task;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
};

export default function TaskItem({ task, onDelete, onToggleComplete }: TaskItemProps) {
  const { toast } = useToast();

  const handleDelete = () => {
    onDelete(task.id);
    toast({
      title: "Task Deleted",
      description: `"${task.title}" has been removed.`,
      variant: "destructive",
    });
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg border transition-all duration-300",
        task.completed ? "bg-accent/30 border-accent/80" : "bg-card"
      )}
    >
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggleComplete(task.id)}
        aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
      />
      <div className="flex-1 grid gap-1">
        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            "font-medium leading-none cursor-pointer",
            task.completed && "line-through text-muted-foreground"
          )}
        >
          {task.title}
        </label>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
                {task.completed ? (
                    <CheckCircle className="h-3 w-3 text-accent-foreground" />
                ) : (
                    <Book className="w-3 h-3"/>
                )}
                <span>{task.subject}</span>
            </div>
            <span>{task.hours} hr{task.hours > 1 ? 's' : ''}</span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 active:bg-destructive/20"
        aria-label={`Delete task ${task.title}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
