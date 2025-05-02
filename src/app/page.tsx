"use client";

import React, { useState, useEffect, useCallback } from 'react';
import type { ToDo } from '@/src/lib/types';
import { ToDoForm } from '@/src/components/todo-form';
import { ToDoTable } from '@/src/components/todo-table';
import { ProductivityDashboard } from '@/src/components/productivity-dashboard';
import { v4 as uuidv4 } from 'uuid'; // Ensure uuid is installed: npm install uuid @types/uuid

export default function Home() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [editingTodo, setEditingTodo] = useState<ToDo | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on the client to avoid hydration issues with uuid
  useEffect(() => {
    setIsClient(true);
  }, []);

  const addTodo = useCallback((description: string) => {
    if (!isClient) return; // Don't run on server
    const newTodo: ToDo = {
      id: uuidv4(),
      description,
      completed: false,
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  }, [isClient]);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    if (editingTodo?.id === id) {
        setEditingTodo(null); // Clear editing state if the deleted todo was being edited
    }
  }, [editingTodo]);

  const toggleComplete = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const updateTodo = useCallback((updatedTodo: ToDo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setEditingTodo(null); // Clear editing state after update
  }, []);

   const startEditing = useCallback((todo: ToDo) => {
     setEditingTodo(todo);
   }, []);

   const clearEditing = useCallback(() => {
     setEditingTodo(null);
   }, []);

   if (!isClient) {
     // Render nothing or a loading state on the server
     return null;
   }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">TaskMaster</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <ToDoForm
             addTodo={addTodo}
             updateTodo={updateTodo}
             editingTodo={editingTodo}
             clearEditing={clearEditing}
            />
           <ToDoTable
             todos={todos}
             deleteTodo={deleteTodo}
             toggleComplete={toggleComplete}
             startEditing={startEditing}
           />
        </div>
        <div className="lg:col-span-1">
            <ProductivityDashboard todos={todos} />
        </div>
      </div>
    </main>
  );
}
