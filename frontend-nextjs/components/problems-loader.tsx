import { Skeleton } from "@/components/ui/skeleton"

export function ProblemLoader() {
    return (<div className="space-y-4 container mx-auto pt-20">
        <div className="border border-blue-800/50 rounded-2xl overflow-hidden p-5 space-y-8">
            {new Array(4).fill(0).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <div className="space-y-2 w-3/4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>

                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-12" />
                </div>

            ))}
        </div>
    </div>
    )
}
