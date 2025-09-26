import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, Users, CheckSquare, Calendar } from "lucide-react";

type Stat = {
  title: string;
  value: string | number;
  change?: string;
  icon: keyof typeof iconMap;
  color?: string;
  trend?: string;
};

const iconMap = {
  FolderKanban,
  Users,
  CheckSquare,
  Calendar,
};

export function DashboardStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon] || FolderKanban;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.change && <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                  {stat.trend && <span className="text-xs font-medium">{stat.trend}</span>}
                </div>}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
