import Component from '@glimmer/component';
import { AddNrgDeprecations } from '../../utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgSidebarMenuGroupComponent extends Component {}
