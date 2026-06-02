// Reusable skeleton shimmer animation base
export function Skeleton({ className = "" }) {
    return (
        <div
            className={`animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] rounded-xl ${className}`}
            style={{ backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}
        />
    );
}

// Stat card skeleton — 4 cards
export function StatCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-black/[0.06] p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gray-100 animate-pulse flex-shrink-0" />
            <div className="flex-1">
                <div className="h-6 w-16 bg-gray-100 animate-pulse rounded-lg mb-2" />
                <div className="h-3 w-24 bg-gray-100 animate-pulse rounded-lg" />
            </div>
        </div>
    );
}

// Property card skeleton
export function PropertyCardSkeleton() {
    return (
        <div className="bg-white rounded-[28px] overflow-hidden border border-gray-100">
            <div className="h-[220px] bg-gray-100 animate-pulse" />
            <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-gray-100 animate-pulse rounded-lg" />
                <div className="h-3 w-1/2 bg-gray-100 animate-pulse rounded-lg" />
                <div className="h-4 w-1/3 bg-gray-100 animate-pulse rounded-lg mt-3" />
            </div>
        </div>
    );
}

// Article card skeleton
export function ArticleCardSkeleton() {
    return (
        <div className="bg-white rounded-[28px] overflow-hidden border border-gray-100">
            <div className="h-[240px] bg-gray-100 animate-pulse" />
            <div className="p-6 space-y-3">
                <div className="h-3 w-24 bg-gray-100 animate-pulse rounded-lg" />
                <div className="h-5 w-5/6 bg-gray-100 animate-pulse rounded-lg" />
                <div className="h-3 w-full bg-gray-100 animate-pulse rounded-lg" />
                <div className="h-3 w-4/5 bg-gray-100 animate-pulse rounded-lg" />
            </div>
        </div>
    );
}

// Table row skeleton
export function TableRowSkeleton({ cols = 5 }) {
    return (
        <tr className="border-b border-black/[0.04]">
            {Array.from({ length: cols }).map((_, i) => (
                <td key={i} className="px-5 py-4">
                    <div className="h-4 bg-gray-100 animate-pulse rounded-lg" style={{ width: `${60 + Math.random() * 40}%` }} />
                </td>
            ))}
        </tr>
    );
}

// Notification list skeleton
export function NotificationSkeleton() {
    return (
        <div className="flex items-start gap-4 p-5 border-b border-gray-50">
            <div className="w-10 h-10 rounded-xl bg-gray-100 animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-gray-100 animate-pulse rounded-lg" />
                <div className="h-3 w-full bg-gray-100 animate-pulse rounded-lg" />
                <div className="h-3 w-1/4 bg-gray-100 animate-pulse rounded-lg" />
            </div>
        </div>
    );
}
