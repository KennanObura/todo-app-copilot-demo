"use client";

import type { ToDo } from "@/src/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

type ToDoTableProps = {
  todos: ToDo[];
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
  startEditing: (todo: ToDo) => void;
};


// test for empty table and when data is available 
export function ToDoTable({ todos, deleteTodo, toggleComplete, startEditing }: ToDoTableProps) {
  return (
    <Card className="shadow-md">
       <CardHeader>
        <CardTitle>Task List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Done</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No tasks yet. Add one above!
                </TableCell>
              </TableRow>
            ) : (
              todos.map((todo) => (
                <TableRow key={todo.id} data-state={todo.completed ? "completed" : "pending"}>
                  <TableCell>
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleComplete(todo.id)}
                      aria-label={todo.completed ? "Mark as not done" : "Mark as done"}
                    />
                  </TableCell>
                  <TableCell className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {todo.description}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => startEditing(todo)} aria-label="Edit task">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)} aria-label="Delete task">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
