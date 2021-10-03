import { BiDish, BiFoodMenu, BiGridAlt } from 'react-icons/bi'

const iconSize = 25

export const NavbarData = [
  {
    id: 'op-mesas',
    title: 'Mesas',
    path: '/admin/mesas',
    icon: <BiGridAlt size={iconSize} />,
  },
  {
    id: 'op-pedidos',
    title: 'Pedidos',
    path: '/admin/pedidos',
    icon: <BiDish size={iconSize} />,
  },
  {
    id: 'op-cardapio',
    title: 'Cardápio',
    path: '/admin/menu',
    icon: <BiFoodMenu size={iconSize} />,
  },
]
