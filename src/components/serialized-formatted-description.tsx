import { cn } from '@/lib/utils'
import DOMPurify from 'isomorphic-dompurify'

export const SanitizedFormattedDescription = ({
description,
className,
}: {
description: string
className?: string
}) => {
return (
  <div
    className={cn('prose w-full max-w-none text-base', className)}
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(description),
    }}
  />
)
}
