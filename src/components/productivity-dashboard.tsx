"use client";

import type { ToDo } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import React, { useMemo } from 'react';

type ProductivityDashboardProps = {
  todos: ToDo[];
};

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))", // Use theme color
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-5))", // Use theme color
  },
} satisfies {
  [key: string]: { label: string; color: string };
};


export function ProductivityDashboard({ todos }: ProductivityDashboardProps) {
   const { completedCount, pendingCount } = useMemo(() => {
    const completed = todos.filter(todo => todo.completed).length;
    return {
      completedCount: completed,
      pendingCount: todos.length - completed,
    };
  }, [todos]);

  const chartData = useMemo(() => [
    { name: "completed", value: completedCount, fill: chartConfig.completed.color },
    { name: "pending", value: pendingCount, fill: chartConfig.pending.color },
  ].filter(item => item.value > 0), [completedCount, pendingCount]); // Filter out zero values for better chart rendering

   const totalTasks = todos.length;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Productivity Stats</CardTitle>
        <CardDescription>Overview of your task completion.</CardDescription>
      </CardHeader>
      <CardContent>
        {totalTasks > 0 ? (
           <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel indicator="dot" />}
                    />
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        strokeWidth={5}
                        labelLine={false} // Hide label lines
                        label={({
                           cx,
                           cy,
                           midAngle,
                           innerRadius,
                           outerRadius,
                           value,
                           index,
                         }) => {
                           // Position label inside the segment
                           const RADIAN = Math.PI / 180;
                           const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                           const x = cx + radius * Math.cos(-midAngle * RADIAN);
                           const y = cy + radius * Math.sin(-midAngle * RADIAN);

                           // Only show label if value is > 0 and there's enough space
                           if (value === 0 || (outerRadius-innerRadius) < 20) return null;

                           return (
                             <text
                               x={x}
                               y={y}
                               fill="hsl(var(--card-foreground))" // Use card foreground for text
                               textAnchor={x > cx ? 'start' : 'end'}
                               dominantBaseline="central"
                               className="fill-foreground text-xs font-medium"
                             >
                               {`${chartConfig[chartData[index].name].label}: ${value}`}
                             </text>
                           );
                         }}
                    >
                         {chartData.map((entry) => (
                             <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                         ))}
                    </Pie>
                 </PieChart>
              </ResponsiveContainer>
           </ChartContainer>
        ) : (
            <p className="text-center text-muted-foreground">No tasks yet to show stats.</p>
        )}
         <div className="mt-4 text-center text-sm text-muted-foreground">
            Total Tasks: {totalTasks}
         </div>
      </CardContent>
    </Card>
  );
}
