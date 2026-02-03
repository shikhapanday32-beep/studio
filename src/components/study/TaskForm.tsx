"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";

const formSchema = z.object({
  subject: z.string().min(2, "Subject must be at least 2 characters.").max(50),
  title: z.string().min(2, "Title must be at least 2 characters.").max(100),
  hours: z.coerce.number().min(0.1, "Hours must be at least 0.1.").max(24),
});

type TaskFormProps = {
  onAddTask: (task: Omit<Task, "id" | "completed">) => void;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      title: "",
      hours: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddTask(values);
    toast({
      title: "Task Added",
      description: `"${values.title}" has been added to your plan.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Mathematics" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Chapter 5 exercises" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time (hours)</FormLabel>
              <FormControl>
                <Input type="number" step="0.5" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </form>
    </Form>
  );
}
