import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Stat = {
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ElementType | React.ReactNode;
  color?: string;
  trend?: string;
};

interface DashboardStatsProps {
  stats: Stat[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="space-y-6">
      {/* Estadísticas Principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              {stat.icon && (typeof stat.icon === 'function' ? (
                <stat.icon className={`h-4 w-4 ${stat.color || ''}`} />
              ) : (
                <span className={stat.color || ''}>{stat.icon}</span>
              ))}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                  {stat.trend && (
                    <span
                      className={`text-xs font-medium ${stat.trend.startsWith("+") ? "text-chart-3" : stat.trend === "0%" ? "text-muted-foreground" : "text-destructive"}`}
                    >
                      {stat.trend}
                    </span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
