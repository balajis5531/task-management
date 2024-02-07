import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  priority: DS.attr('string'),
  status: DS.attr('string'),
  createdAt: DS.attr('date', { defaultValue: () => new Date() }),
});