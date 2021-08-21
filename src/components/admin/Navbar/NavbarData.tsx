import { BiDish, BiFoodMenu, BiGridAlt } from 'react-icons/bi'

const iconSize = 25

export const NavbarData = [
  {
    id: 'op-pedidos',
    title: 'Pedidos',
    path: '/pedidos',
    icon: <BiDish size={iconSize} />,
  },
  {
    id: 'op-mesas',
    title: 'Mesas',
    path: '/mesas',
    icon: <BiGridAlt size={iconSize} />,
  },
  {
    id: 'op-cardapio',
    title: 'Cardápio',
    path: '/cardapio',
    icon: <BiFoodMenu size={iconSize} />,
  },
]
