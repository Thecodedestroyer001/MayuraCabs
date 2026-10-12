type BrandLogoProps = {
  className?: string
}

export default function BrandLogo({ className = '' }: BrandLogoProps) {
  return (
    <span
      role="img"
      aria-label="Mayura Car Rentals"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <span className="relative block h-[44px] w-[56px] shrink-0 overflow-hidden" aria-hidden="true">
        <span
          className="absolute block bg-no-repeat"
          style={{
            width: '98.4px',
            height: '71.84px',
            left: '-24.67px',
            top: 0,
            backgroundImage: 'url(/logo-custom.png)',
            backgroundSize: '98.4px 71.84px',
          }}
        />
      </span>
      <span className="flex h-[37px] w-[132px] shrink-0 flex-col" aria-hidden="true">
        <span className="relative block h-[27px] w-[132px] overflow-hidden">
          <span
            className="absolute block bg-no-repeat"
            style={{
              width: '132.3px',
              height: '96.9px',
              left: 0,
              top: '-60.6px',
              backgroundImage: 'url(/logo-custom.png)',
              backgroundSize: '132.3px 96.9px',
            }}
          />
        </span>
        <span className="relative -mt-1 block h-[14px] w-[108px] overflow-hidden">
          <span
            className="absolute block bg-no-repeat"
            style={{
              width: '132.3px',
              height: '96.9px',
              left: '-25px',
              top: '-83px',
              backgroundImage: 'url(/logo-custom.png)',
              backgroundSize: '132.3px 96.9px',
            }}
          />
        </span>
      </span>
    </span>
  )
}
