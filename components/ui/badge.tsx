import * as React from 'react'
import { cn } from '@/lib/utils'

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement>

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground', className)}
    {...props}
  />
))

Badge.displayName = 'Badge'

export { Badge }


