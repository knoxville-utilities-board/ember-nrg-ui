import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    clickedLink(item) {
      this.send("clickedSidebarItem", item);
    },
  }
});
