import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Checkbox',
  component: 'nrg-checkbox',
};

const Template = (args) => ({
  template: hbs`<NrgCheckbox @value={{this.value}} />`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  value: false,
};

export const Checked = Template.bind({});
Checked.args = {
  value: true,
};
