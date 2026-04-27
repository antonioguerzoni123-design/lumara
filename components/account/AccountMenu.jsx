'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, MapPin, Heart, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useCustomer } from '@/hooks/useCustomer';

const links = [
  { href: '/conta/encomendas', label: 'Encomendas', icon: Package },
  { href: '/conta/moradas', label: 'Moradas', icon: MapPin },
  { href: '/conta/favoritos', label: 'Favoritos', icon: Heart },
  { href: '/conta/preferencias', label: 'Preferências', icon: Settings },
  { href: '/conta/apoio', label: 'Apoio ao cliente', icon: HelpCircle },
];

export function AccountMenu() {
  const pathname = usePathname();
  const { customer } = useCustomer();

  const name = customer
    ? [customer.firstName, customer.lastName].filter(Boolean).join(' ') || 'Cliente'
    : 'A carregar…';
  const email = customer?.emailAddress?.emailAddress ?? '';
  const initial = name.charAt(0).toUpperCase();

  return (
    <nav className="bg-white border border-[#E8E0F0] rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 p-5 border-b border-[#E8E0F0]">
        <div className="w-10 h-10 rounded-full bg-[#E0D4F9] flex items-center justify-center text-[#8B6BE0] font-semibold text-sm">
          {initial}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1A1A2E]">{name}</p>
          {email && <p className="text-xs text-[#6B6B8A]">{email}</p>}
        </div>
      </div>

      <ul className="py-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                  active
                    ? 'bg-[#F3EFFE] text-[#8B6BE0] font-medium'
                    : 'text-[#1A1A2E] hover:bg-[#F3EFFE] hover:text-[#8B6BE0]'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-[#E8E0F0] p-2">
        <a
          href="/api/auth/logout"
          className="flex items-center gap-3 px-5 py-3 text-sm text-[#6B6B8A] hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors w-full"
        >
          <LogOut size={16} />
          Terminar sessão
        </a>
      </div>
    </nav>
  );
}
