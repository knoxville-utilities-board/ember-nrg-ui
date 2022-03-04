import { hbs } from 'ember-cli-htmlbars';

// import { action } from '@storybook/addon-actions';

export default {
  title: 'Button',
  component: 'nrg-button',
  excludeStories: /.*Data$/,
};

const Template = (args) => ({
  template: hbs`<NrgButton @text={{this.text}} @disabled={{this.disabled}} @loading={{this.loading}} @autofocus={{this.autofocus}}  @class={{this.class}}
    @icon={{this.icon}} @onClick={{this.onClick}} />`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  text: 'Hover Me',
  disabled: false,
  loading: false,
  autofocus: false,
  class: '',
  onClick: () => {
    alert('You clicked the button!');
  },
};

export const Primary = Template.bind({});
Primary.args = {
  text: 'Primary',
  disabled: false,
  loading: false,
  autofocus: false,
  class: 'primary',
  onClick: () => {
    alert('You clicked the button!');
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Secondary',
  disabled: false,
  loading: false,
  autofocus: false,
  class: 'secondary',
  onClick: () => {
    alert('You clicked the button!');
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: 'Disabled',
  disabled: true,
  loading: false,
  autofocus: false,
  class: '',
  onClick: () => {
    alert('You clicked the button!');
  },
};

export const Loading = Template.bind({});
Loading.args = {
  text: 'Loading',
  disabled: false,
  loading: true,
  autofocus: false,
  class: '',
  onClick: () => {
    alert('You clicked the button!');
  },
};
