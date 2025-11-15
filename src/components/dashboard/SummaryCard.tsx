import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

interface SummaryCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    subtitle?: string;
    isLoading?: boolean;
    trendIcon?: React.ReactNode;
}

export function SummaryCard({ title, value, icon, subtitle, isLoading, trendIcon }: SummaryCardProps) {
    return (
        <Card className="bg-card border">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                    {icon}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (<>
                    <Skeleton className="w-10 h-7" />
                    <Skeleton className="w-20 h-4 mt-1" />
                </>) : (<>
                    <div className="text-3xl font-bold text-foreground">{value}</div>
                    {subtitle && (
                        <p className="text-xs text-muted-foreground flex items-center">
                            {trendIcon}
                            {subtitle}
                        </p>
                    )}
                </>
                )}
            </CardContent>
        </Card>
    );
}