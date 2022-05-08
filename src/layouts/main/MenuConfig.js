import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import fileFill from '@iconify/icons-eva/file-fill';
// routes

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22
};

const menuConfig = [
  {
    title: 'Home',
    path: 'move_top',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />
  },
  {
    title: 'Walk-In Shower',
    path: 'walk',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />
  },
  { title: 'Bathtub', path: 'bathtub', icon: <Icon icon={fileFill} {...ICON_SIZE} /> },
  { title: 'Services', path: 'service', icon: <Icon icon={fileFill} {...ICON_SIZE} /> },
  { title: 'Contact', path: 'contact', icon: <Icon icon={fileFill} {...ICON_SIZE} /> }
];

export default menuConfig;
