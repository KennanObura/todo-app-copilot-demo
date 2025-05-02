import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoTable } from "../components/todo-table";

jest.mock('@/src/components/ui/table', () => ({
  Table: (props: any) => <table {...props} />,
  TableHeader: (props: any) => <thead {...props} />,
  TableBody: (props: any) => <tbody {...props} />,
  TableFooter: (props: any) => <tfoot {...props} />,
  TableHead: (props: any) => <th {...props} />,
  TableRow: (props: any) => <tr {...props} />,
  TableCell: (props: any) => <td {...props} />,
  TableCaption: (props: any) => <caption {...props} />,
}));

jest.mock('@/src/components/ui/button', () => ({
  Button: (props: any) => <button {...props} />,
}));

jest.mock('@/src/components/ui/checkbox', () => ({
  Checkbox: (props: any) => <input type="checkbox" {...props} />,
}));

jest.mock('@/src/components/ui/card', () => ({
  Card: (props: any) => <div {...props} />,
  CardContent: (props: any) => <div {...props} />,
  CardHeader: (props: any) => <div {...props} />,
  CardTitle: (props: any) => <div {...props} />,
}));

const mockTodos = [
  {
    id: "1",
    description: "Test Task 1",
    completed: false,
  },
  {
    id: "2",
    description: "Test Task 2",
    completed: true,
  },
];

describe("ToDoTable", () => {
  it("renders empty state when no todos", () => {
    render(
      <ToDoTable
        todos={[]}
        deleteTodo={jest.fn()}
        toggleComplete={jest.fn()}
        startEditing={jest.fn()}
      />
    );
    expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
  });

  it("renders todos when data is available", () => {
    render(
      <ToDoTable
        todos={mockTodos}
        deleteTodo={jest.fn()}
        toggleComplete={jest.fn()}
        startEditing={jest.fn()}
      />
    );
    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
    expect(screen.getAllByLabelText(/Edit task/i)).toHaveLength(2);
    expect(screen.getAllByLabelText(/Delete task/i)).toHaveLength(2);
  });
});