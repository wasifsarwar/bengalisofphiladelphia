import assert from 'node:assert/strict';
import { test } from 'node:test';
import { philadelphiaDate, upcomingEvents } from '../src/data/eventDates.ts';
const event = (id, date, url = 'https://example.com/event') => ({ id, date, url, title: 'Test fixture', time: '', location: '', description: '' });
test('Philadelphia calendar date stays local across UTC midnight and DST', () => {
  assert.equal(philadelphiaDate(new Date('2026-11-13T02:00:00Z')), '2026-11-12');
  assert.equal(philadelphiaDate(new Date('2026-07-13T03:00:00Z')), '2026-07-12');
});
test('keeps today, excludes past and invalid dates/URLs, sorts without mutating', () => {
  const input = [event('future','2026-12-01'),event('past','2026-11-11'),event('today','2026-11-12'),event('bad','2026-02-30'),event('unsafe','2026-11-15','javascript:alert(1)')];
  assert.deepEqual(upcomingEvents(input,'2026-11-12').map(e=>e.id), ['today','future']);
  assert.equal(input[0].id, 'future');
  assert.deepEqual(upcomingEvents([], '2026-11-12'), []);
});
test('handles leap years and year rollover', () => {
  assert.equal(upcomingEvents([event('leap','2028-02-29')],'2028-02-29').length,1);
  assert.equal(upcomingEvents([event('expired','2026-12-31')],'2027-01-01').length,0);
});
