import test from 'node:test';
import assert from 'node:assert/strict';
import { photoSwipe } from '../src/utils/photoSwipe.ts';

test('horizontal swipes browse in both directions', () => {
  assert.equal(photoSwipe(-80, 10), 1);
  assert.equal(photoSwipe(80, -10), -1);
  assert.equal(photoSwipe(-48, 0), 1);
});
test('taps, small movements and vertical scrolls do not browse', () => {
  for (const [dx, dy] of [[0,0], [12,3], [47,0], [20,90], [70,80], [48,40]]) {
    assert.equal(photoSwipe(dx,dy), 0);
  }
});

test('mouse drags can use a shorter threshold without treating clicks as swipes', () => {
  assert.equal(photoSwipe(28, 2, 24), -1);
  assert.equal(photoSwipe(-28, 2, 24), 1);
  assert.equal(photoSwipe(12, 2, 24), 0);
  assert.equal(photoSwipe(28, 40, 24), 0);
});
