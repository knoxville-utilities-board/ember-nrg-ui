import { hbs } from 'ember-cli-htmlbars';

// import { action } from '@storybook/addon-actions';

export default {
  title: 'Button',
  component: 'nrg-button',
  excludeStories: /.*Data$/,
};

const Template = (args) => ({
  template: hbs`<NrgButton @text={{this.text}} @disabled={{this.disabled}} />`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  text: 'Hover Me',
  disabled: false,
};
