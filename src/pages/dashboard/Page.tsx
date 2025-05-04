import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { tasks } from "@/dummy/data";
import { Task } from "@/types/types";
import {
  BriefcaseBusiness,
  LayoutGrid,
  ListTodo,
  LoaderCircle,
  SquareCheck,
  Users,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { format } from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

function CardInfo(item: {
  icon: LucideIcon;
  name: string;
  count: number;
  className: string;
}) {
  return (
    <div className="p-3 md:p-4 md:gap-4 gap-2 border-border border rounded-md flex items-center justify-start cursor-pointer">
      <div className={`md:p-4 p-2 rounded-md border ${item.className}`}>
        <item.icon className="md:w-[30px] md:h-[30px] w-5 h-5" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-muted-foreground md:text-base text-xs">
          {item.name}
        </h3>
        <p className="text-foreground md:text-[32px] text-base font-bold">
          {item.count}
        </p>
      </div>
    </div>
  );
}

function TasksList({ tasks, priority }: { tasks: Task[]; priority: string }) {
  let color;
  switch (priority) {
    case "urgent":
      color = "text-red-600";
      break;
    case "high":
      color = "text-orange-500";
      break;
    case "medium":
      color = "text-blue-600";
      break;
    case "low":
      color = "text-green-600";
      break;
    default:
      color = "text-foreground";
      break;
  }

  return (
    <div className="flex flex-col gap-1 mt-4">
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">Priority</p>
        <p className={`capitalize ${color}`}>{priority}</p>
      </div>
      <div className="border border-border p-2 rounded-md flex flex-col gap-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="flex items-center justify-start cursor-pointer gap-2 hover:bg-muted-foreground/10 rounded-md transition-all">
              <div
                className={`p-2 rounded-md border bg-blue-600/10 text-blue-600 border-blue-600`}
              >
                <ListTodo className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-foreground text-base line-clamp-1">
                  {task.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {format(task.deadline, "dd MMM yyyy")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex p-4 items-center justify-center gap-2 text-sm text-muted-foreground">
            <ListTodo className="w-5 h-5" />
            No Assignment
          </div>
        )}
      </div>
    </div>
  );
}

function ProductivityChart() {
  const chartData = [
    { month: "Desember", todo: 1, inProgress: 4, onReview: 5, done: 8 },
    { month: "January", todo: 2, inProgress: 7, onReview: 2, done: 11 },
    { month: "February", todo: 0, inProgress: 1, onReview: 7, done: 7 },
    { month: "March", todo: 7, inProgress: 3, onReview: 2, done: 5 },
    { month: "April", todo: 3, inProgress: 7, onReview: 2, done: 10 },
    { month: "May", todo: 4, inProgress: 5, onReview: 1, done: 13 },
  ];

  const chartConfig = {
    todo: {
      label: "To Do",
      color: "#ED3A3C",
    },
    inProgress: {
      label: "In Progress",
      color: "#4E3CEC",
    },
    onReview: {
      label: "On Review",
      color: "#ED7F3A",
    },
    done: {
      label: "Done",
      color: "#18AE2F",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend verticalAlign="top" content={<ChartLegendContent />} />
        <Bar dataKey="todo" fill="var(--color-todo)" radius={4} />
        <Bar dataKey="inProgress" fill="var(--color-inProgress)" radius={4} />
        <Bar dataKey="onReview" fill="var(--color-onReview)" radius={4} />
        <Bar dataKey="done" fill="var(--color-done)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export default function DashboardPage() {
  const tasksUrgent: Task[] = [];
  const tasksHigh: Task[] = [];
  const tasksMedium: Task[] = [];
  const tasksLow: Task[] = [];
  const tasksUnknown: Task[] = [];

  tasks.forEach((task: Task) => {
    if (task.priority === "urgent") {
      tasksUrgent.push(task);
    } else if (task.priority === "high") {
      tasksHigh.push(task);
    } else if (task.priority === "medium") {
      tasksMedium.push(task);
    } else if (task.priority === "low") {
      tasksLow.push(task);
    } else {
      tasksUnknown.push(task);
    }
  });

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {/* <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" /> */}
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 pb-28 px-4 lg:px-8 pt-0">
        <div>
          <h2 className="md:text-[32px] text-2xl font-semibold">Dashboard</h2>
          <p className="text-sm md:text-xl text-muted-foreground">
            You can see a summary of the information here
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="rounded-md col-span-2 h-100 order-1 md:order-first">
            <div className="grid grid-cols-2 gap-4">
              <CardInfo
                icon={BriefcaseBusiness}
                name="Workspaces"
                count={6}
                className="bg-green-600/10 text-green-600 border-green-600"
              />
              <CardInfo
                icon={LayoutGrid}
                name="My Tasks"
                count={32}
                className="bg-orange-400/10 text-orange-400 border-orange-400"
              />
              <CardInfo
                icon={Users}
                name="Members"
                count={8}
                className="bg-neutral-400/10 text-neutral-400 border-neutral-400"
              />
              <CardInfo
                icon={SquareCheck}
                name="Tasks Completed"
                count={11}
                className="bg-blue-600/10 text-blue-600 border-blue-600"
              />
              <Card className="rounded-md col-span-2 bg-transparent">
                <CardTitle className="text-center md:text-xl">
                  Productivity Chart
                </CardTitle>
                <CardContent>
                  <ProductivityChart />
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="border-border border rounded-md order-0 md:order-last col-span-2 md:col-span-1 p-4">
            <h2 className="md:text-2xl text-lg font-bold">Your To Do List</h2>

            <div className="mt-4 flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <LoaderCircle className="md:w-4 md:h-4 w-3 h-3" />
                <p className="md:text-base text-sm">Tasks Progress</p>
              </div>
              <Progress
                value={50}
                className="h-3 bg-transparent border border-blue-600"
              />
              <div className="flex items-center justify-between">
                <p className="md:text-sm text-xs text-muted-foreground">
                  5/10 tasks completed
                </p>
                <p className="md:text-sm text-xs text-blue-600">50%</p>
              </div>
            </div>

            <TasksList tasks={tasksUrgent} priority="urgent" />
            <TasksList tasks={tasksHigh} priority="high" />
            <TasksList tasks={tasksMedium} priority="medium" />
            <TasksList tasks={tasksLow} priority="low" />
            <TasksList tasks={tasksUnknown} priority="unknown" />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
