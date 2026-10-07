import Image from 'next/image'

const clients = [
  { name: 'Riveron', logo: '/client-logos/riveron-wordmark.png', format: 'wide' },
  { name: 'Baker Tilly', logo: '/client-logos/baker-tilly.png' },
  { name: 'Celonis', logo: '/client-logos/celonis.png' },
  { name: 'Modivcare', logo: '/client-logos/modivcare.png' },
  { name: 'Novotech', logo: '/client-logos/novotech.png' },
  { name: 'Moneyview', logo: '/client-logos/moneyview.svg' },
]

function LogoSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="client-logo-set" aria-hidden={duplicate || undefined}>
      {clients.map((client) => (
        <div
          className={`client-logo-item${client.format === 'wide' ? ' client-logo-item--wide' : ''}`}
          key={client.name}
        >
          <Image
            src={client.logo}
            alt={duplicate ? '' : `${client.name} logo`}
            width={112}
            height={112}
            className={`client-logo-image${client.format === 'wide' ? ' client-logo-image--wide' : ''}`}
            sizes="112px"
          />
          <span>{client.name}</span>
        </div>
      ))}
    </div>
  )
}

export default function ClientLogoBelt() {
  return (
    <section className="client-belt" aria-labelledby="client-belt-title">
      <div className="container client-belt-heading">
        <p className="client-belt-kicker">Trusted across industries</p>
        <h2 id="client-belt-title">Companies that move with Mayura</h2>
      </div>

      <div className="client-logo-viewport">
        <div className="client-logo-track">
          <LogoSet />
          <LogoSet duplicate />
        </div>
      </div>
    </section>
  )
}
