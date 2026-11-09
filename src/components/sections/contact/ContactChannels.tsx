import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import SpotlightCard from '@/components/shared/SpotlightCard';
import { contactChannelHints } from '@/data/contactData';
import { buildWhatsAppLink, siteConfig } from '@/data/siteConfig';

interface Channel {
  id: string;
  title: string;
  detail: string;
  hint: string;
  href: string;
  isExternal: boolean;
  icon: LucideIcon;
  cardClasses: string;
  iconClasses: string;
  spotColor: string;
  span: string;
}

const channels: Channel[] = [
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    detail: siteConfig.phoneDisplay,
    hint: contactChannelHints.whatsapp,
    href: buildWhatsAppLink('Hi Design N Print, I would like a quote.'),
    isExternal: true,
    icon: MessageCircle,
    cardClasses: 'bg-whatsapp text-ink',
    iconClasses: 'bg-ink text-whatsapp',
    spotColor: 'rgba(255,255,255,0.45)',
    span: 'col-span-2 lg:col-span-2',
  },
  {
    id: 'call',
    title: 'Call us',
    detail: siteConfig.secondaryPhoneDisplay,
    hint: contactChannelHints.call,
    href: `tel:+${siteConfig.secondaryPhoneNumber}`,
    isExternal: false,
    icon: Phone,
    cardClasses: 'bg-ink text-white',
    iconClasses: 'bg-brand-yellow text-ink',
    spotColor: 'rgba(255,255,255,0.18)',
    span: '',
  },
  {
    id: 'email',
    title: 'Email',
    detail: siteConfig.email,
    hint: contactChannelHints.email,
    href: `mailto:${siteConfig.email}`,
    isExternal: false,
    icon: Mail,
    cardClasses: 'bg-white text-ink ring-1 ring-ink/10',
    iconClasses: 'bg-ink text-brand-yellow',
    spotColor: 'rgba(0,160,227,0.18)',
    span: '',
  },
  {
    id: 'visit',
    title: 'Visit',
    detail: siteConfig.location,
    hint: contactChannelHints.visit,
    href: '#find-us',
    isExternal: false,
    icon: MapPin,
    cardClasses: 'bg-white text-ink ring-1 ring-ink/10',
    iconClasses: 'bg-ink text-brand-yellow',
    spotColor: 'rgba(229,36,33,0.14)',
    span: 'col-span-2 lg:col-span-1',
  },
];

/** Four ways to reach us. WhatsApp leads — it is the fastest route to a quote. */
export default function ContactChannels() {
  return (
    <section className="bg-paper py-16 sm:py-24" aria-labelledby="channels-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Pick your channel</p>
          <h2 id="channels-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            However you like to talk, we are there.
          </h2>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-5">
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            const linkProps = channel.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <li key={channel.id} className={channel.span}>
                <Reveal delay={index * 0.08} className="h-full">
                  <SpotlightCard
                    spotColor={channel.spotColor}
                    className={`h-full rounded-3xl shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${channel.cardClasses}`}
                  >
                    <a
                      href={channel.href}
                      {...linkProps}
                      className="flex h-full min-h-[11rem] flex-col p-4 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-blue sm:min-h-[14rem] sm:p-7"
                    >
                      <span className="flex items-start justify-between">
                        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 ${channel.iconClasses}`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <ArrowUpRight className="h-5 w-5 opacity-50 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100" />
                      </span>
                      <span className="mt-auto pt-6 sm:pt-10">
                        <span className="block font-display text-xl font-bold sm:text-2xl">{channel.title}</span>
                        <span className="mt-1 block text-xs font-semibold [overflow-wrap:anywhere] opacity-90 sm:text-sm">{channel.detail}</span>
                        <span className="mt-2 block text-xs leading-snug opacity-70 sm:text-sm">{channel.hint}</span>
                      </span>
                    </a>
                  </SpotlightCard>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
