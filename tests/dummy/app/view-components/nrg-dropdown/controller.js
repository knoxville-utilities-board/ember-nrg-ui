import Controller from '@ember/controller';

export default Controller.extend({
  optionList: [
    {
      label: 'Item 1',
      value: 'Value A',
      icon: 'power off',
    },
    {
      label: 'Item 2',
      value: 'Value B',
      icon: 'clock',
    },
    {
      label: 'Item 3',
      value: 'Value C',
      icon: 'pencil alternate',
    },
    {
      label: 'Item 4',
      value: 'Value D',
      icon: 'microchip',
    },
    {
      label: 'Item 5',
      value: 'Value E',
      icon: 'comment',
    },
  ],
  optionListStrings: [
    'Item String 1',
    'Item String 2',
    'Item String 3',
    'Item String 4',
    'Item String 5',
  ],
  allowAdditionsOptionsList: [
    {
      label: 'Item 1',
      value: 'Value A',
      icon: 'power off',
    }
  ],
  allowAdditionsOptionsListStrings: [
    'Item String 1',
  ],
});
