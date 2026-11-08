import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import { siteConfig } from '@/data/siteConfig';

const linkClasses = 'font-semibold text-ink underline-offset-4 transition-colors hover:text-brand-blue hover:underline';

/** Address, phones / email, and working hours as three elevated cards. */
export default function ContactInfoCards() {
  const cards = [
    {
      id: 'address',
      title: 'Visit our press',
      icon: MapPin,
      content: (
        <address className="text-sm not-italic leading-relaxed text-ink/75">
          {siteConfig.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      ),
    },
    {
      id: 'reach',
      title: 'Quick contact',
      icon: Phone,
      content: (
        <ul className="space-y-2 text-sm">
          <li>
            <a href={`tel:+${siteConfig.whatsappNumber}`} className={linkClasses}>
              {siteConfig.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={`tel:+${siteConfig.secondaryPhoneNumber}`} className={linkClasses}>
              {siteConfig.secondaryPhoneDisplay}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted" />
            <a href={`mailto:${siteConfig.email}`} className={`${linkClasses} break-all`}>
              {siteConfig.email}
            </a>
          </li>
        </ul>
      ),
    },
    {
      id: 'hours',
      title: 'Working hours',
      icon: Clock,
      content: (
        <ul className="space-y-2 text-sm text-ink/75">
          {siteConfig.workingHours.map((slot) => (
            <li key={slot.label} className="flex justify-between gap-4">
              <span className="font-semibold text-ink">{slot.label}</span>
              <span>{slot.value}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <li key={card.id}>
            <Reveal delay={index * 0.08} className="h-full">
              <div className="h-full rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-brand-yellow">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-display text-lg font-bold text-ink">{card.title}</h2>
                <div className="mt-3">{card.content}</div>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
