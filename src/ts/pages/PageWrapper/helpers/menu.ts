import plugins from 'ts/helpers/Plugins';

export const TYPES = [
  {
    id: 'team',
    title: 'sidebar.switch.team',
    icon: './assets/switch/team.svg',
  },
  {
    id: 'person',
    title: 'sidebar.switch.person',
    icon: './assets/switch/person.svg',
  },
];

export const TEAM = plugins.getMenuItems('t');
export const PERSON = plugins.getMenuItems('p');
