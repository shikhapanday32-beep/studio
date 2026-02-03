"use client";

import { useMemo } from "react";
import type { Task } from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import Summary from "./Summary";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function StudyPlanner() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("study-tasks", []);

  const handleAddTask = (newTask: Omit<Task, "id" | "completed">) => {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const totalHours = useMemo(() => {
    return tasks.reduce((sum, task) => sum + Number(task.hours), 0);
  }, [tasks]);

  const completedTasks = useMemo(() => {
    return tasks.filter((task) => task.completed).length;
  }, [tasks]);

  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;


  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground flex items-center justify-center gap-3">
            <GraduationCap className="w-10 h-10 text-primary-foreground dark:text-primary" />
            StudyZen
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Your personal dashboard for focused learning.</p>
        </header>

        <main className="space-y-8">

          {totalTasks > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>
                  {completedTasks} of {totalTasks} tasks completed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progressPercentage} className="h-3" />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Add a New Study Task</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskForm onAddTask={handleAddTask} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Today's Plan</CardTitle>
              <Summary totalHours={totalHours} />
            </CardHeader>
            <CardContent>
              <TaskList
                tasks={tasks}
                onDeleteTask={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            </CardContent>
          </Card>
        </main>
        
        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>Happy studying!</p>
        </footer>
      </div>
    </div>
  );
}
