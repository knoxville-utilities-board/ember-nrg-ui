import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ViewComponentsNrgDropdownController extends Controller {
  @tracked
  selectedOption;

  @tracked
  optionList = [
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
  ];

  @tracked
  optionListStrings = [
    'Item String 1',
    'Item String 2',
    'Item String 3',
    'Item String 4',
    'Item String 5',
  ];

  @tracked
  allowAdditionsOptionsList = [
    {
      label: 'Item 1',
      value: 'Value A',
      icon: 'power off',
    },
  ];

  @tracked
  allowAdditionsOptionsListStrings = ['Item String 1'];

  @tracked
  workers = [
    'Lurline Groce',
    'Miyoko Galbreath',
    'Bambi Lincoln',
    'Roman Santistevan',
    'Alva Messier',
    'Regina Youngquist',
    'Debroah Longmire',
    'Marianna Mathes',
    'Roy Kohl',
    'Alix Gautier',
    'Tarra Arciniega',
    'Nikole Wyrick',
    'Charlott Saito',
    'Beulah Eldred',
    'Elwood Rowden',
    'Alayna Attebery',
    'Krysten Henkle',
    'Onita Testerman',
    'Penni Rorick',
    'Ronny Armentrout',
  ];

  @tracked
  crews = [
    'A427',
    'A884',
    'A581',
    'A573',
    'A516',
    'E637',
    'E119',
    'E966',
    'E726',
    'E813',
    'E397',
    'U412',
    'U248',
    'U204',
    'U272',
    'U510',
    'U487',
    'U342',
    'U101',
    'U626',
  ];

  @action
  onItemSelect() {}
}
