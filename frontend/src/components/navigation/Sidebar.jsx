import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  CircleDollarSign,
  Armchair,
  ClipboardList,
  CalendarDays,
  Users,
  UtensilsCrossed,
  Warehouse,
  ShieldCheck,
  ChartNoAxesCombined,
} from 'lucide-react'

const navigationItems = [
  {
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: 'Cassa',
    path: '/cassa',
    icon: CircleDollarSign,
  },
  {
    label: 'Sala',
    path: '/sala',
    icon: Armchair,
  },
  {
    label: 'Comande',
    path: '/comande',
    icon: ClipboardList,
  },
  {
    label: 'Prenotazioni',
    path: '/prenotazioni',
    icon: CalendarDays,
  },
  {
    label: 'Clienti',
    path: '/clienti',
    icon: Users,
  },
  {
    label: 'Menu',
    path: '/menu',
    icon: UtensilsCrossed,
  },
  {
    label: 'Magazzino',
    path: '/magazzino',
    icon: Warehouse,
  },
  {
    label: 'HACCP',
    path: '/haccp',
    icon: ShieldCheck,
  },
  {
    label: 'Report',
    path: '/report',
    icon: ChartNoAxesCombined,
  },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-small">GESTIONE</span>
        <strong>Ristorante & Pizzeria</strong>
      </div>

      <nav className="sidebar-navigation" aria-label="Navigazione principale">
        {navigationItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `sidebar-link${isActive ? ' sidebar-link-active' : ''}`
              }
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar