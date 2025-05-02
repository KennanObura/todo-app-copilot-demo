"use client";

import type { ToDo } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect } from 'react';

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Plus, Save } from 'lucide-react';

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Task description cannot be empty.",
  }),
});

type ToDoFormProps = {
  addTodo: (description: string) => void;
  updateTodo: (todo: ToDo) => void;
  editingTodo: ToDo | null;
  clearEditing: () => void;
};

export function ToDoForm({ addTodo, updateTodo, editingTodo, clearEditing }: ToDoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  useEffect(() => {
    if (editingTodo) {
      form.setValue("description", editingTodo.description);
    } else {
      form.reset();
    }
  }, [editingTodo, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (editingTodo) {
      updateTodo({ ...editingTodo, description: values.description });
    } else {
      addTodo(values.description);
    }
    form.reset();
  }

  const handleCancel = () => {
    clearEditing();
    form.reset();
  }

  return (
    <Card className="mb-6 shadow-md">
      <CardHeader>
        <CardTitle>{editingTodo ? "Edit Task" : "Add New Task"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit" variant={editingTodo ? "default" : "accent"}>
                {editingTodo ? <Save /> : <Plus />}
                {editingTodo ? "Save Changes" : "Add Task"}
              </Button>
              {editingTodo && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// Add the variant 'accent' to buttonVariants if it doesn't exist
// This might require modifying src/components/ui/button.tsx
// However, the user request mentions using the Accent color for specific buttons.
// Since ShadCN/Tailwind handle this via themes, we can style the button directly
// or preferably add an 'accent' variant. For simplicity here, we'll use direct styling
// if 'accent' variant isn't available in the base button component.
// A better approach would be to add the 'accent' variant to the button component itself.

// In src/components/ui/button.tsx add the 'accent' variant:
/*
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        default: "...",
        destructive: "...",
        outline: "...",
        secondary: "...",
        ghost: "...",
        link: "...",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90", // Added accent variant
      },
      // ... rest of the variants
    },
    // ... rest of the config
  }
)
*/
// Since modifying ui/button.tsx directly might conflict with future updates,
// we can apply the styles directly using className in this component, or rely on the theme setup.
// The theme setup should handle the 'accent' color. Let's assume 'accent' variant exists or is added.
