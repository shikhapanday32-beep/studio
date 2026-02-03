"use client";

import type { Task } from "@/types";
import TaskItem from "./TaskItem";
import { BookOpen } from "lucide-react";

type TaskListProps = {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
};

export default function TaskList({ tasks, onDeleteTask, onToggleComplete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10 border-2 border-dashed rounded-lg">
        <BookOpen className="mx-auto h-12 w-12" />
        <p className="mt-4">No tasks yet.</p>
        <p>Add a task above to get started!</p>
      </div>
    );
  }

  const sortedTasks = [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}
