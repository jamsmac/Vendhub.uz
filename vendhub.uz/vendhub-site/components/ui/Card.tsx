import { ReactNode } from 'react'

interface CardProps {
  className?: string
  hover?: boolean
  onClick?: () => void
  ariaLabel?: string
  children: ReactNode
}

export default function Card({
  className = '',
  hover = false,
  onClick,
  ariaLabel,
  children,
}: CardProps) {
  const isInteractive = typeof onClick === 'function'

  return (
    <div
      className={[
        'coffee-card',
        hover ? 'hover-lift' : '',
        isInteractive ? 'cursor-pointer' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? ariaLabel : undefined}
      onKeyDown={
        isInteractive
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onClick?.()
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  )
}
