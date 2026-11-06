import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-16 h-16 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
            {/* <p className="mt-4 text-lg text-primary">...</p> */}
            <Skeleton className="w-32 h-4 mt-4" />
        </div>
    );
}
