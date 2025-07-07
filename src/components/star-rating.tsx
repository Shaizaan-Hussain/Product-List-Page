import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  totalStars?: number;
  size?: number;
  className?: string;
  showReviewCount?: boolean;
}

export function StarRating({
  rating,
  reviewCount,
  totalStars = 5,
  size = 16,
  className,
  showReviewCount = true,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="text-primary fill-primary" style={{ width: size, height: size }} />
        ))}
        {halfStar && <Star key="half" className="text-primary fill-primary" style={{ width: size, height: size, clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)' }} />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="text-muted-foreground/50" style={{ width: size, height: size }} />
        ))}
      </div>
      {showReviewCount && reviewCount !== undefined && (
         <span className="text-sm text-muted-foreground">({reviewCount})</span>
      )}
    </div>
  );
}
