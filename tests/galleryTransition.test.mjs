import assert from 'node:assert/strict';
import { test } from 'node:test';
import { galleryTransition } from '../src/utils/galleryTransition.ts';

function environment({ reduced = false, start } = {}) {
  globalThis.window = { matchMedia: () => ({ matches: reduced }) };
  globalThis.document = { startViewTransition: start };
  const image = { isConnected: true, style: { viewTransitionName: '' } };
  let focused = false;
  const trigger = { querySelector: () => image, focus: () => { focused = true; } };
  return { image, trigger, focused: () => focused };
}

test('unsupported and reduced-motion paths apply immediately without naming the image', () => {
  for (const settings of [{}, { reduced: true, start: () => { throw new Error('must not animate'); } }]) {
    const { image, trigger } = environment(settings);
    let changes = 0;
    galleryTransition(() => changes++, trigger);
    assert.equal(changes, 1);
    assert.equal(image.style.viewTransitionName, '');
  }
});

test('opening names the origin only until the gallery update, then cleans up', async () => {
  let finish;
  const finished = new Promise(resolve => { finish = resolve; });
  const context = environment({ start: callback => {
    assert.equal(context.image.style.viewTransitionName, 'bop-photo');
    callback();
    assert.equal(context.image.style.viewTransitionName, '');
    return { finished };
  } });
  let changes = 0;
  galleryTransition(() => changes++, context.trigger);
  assert.equal(changes, 1);
  assert.equal(context.focused(), true);
  finish();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(context.image.style.viewTransitionName, '');
});

test('closing keeps return image named for the new snapshot, then cleans up', async () => {
  const { image, trigger } = environment({ start: callback => { callback(); return { finished: Promise.resolve() }; } });
  galleryTransition(() => {}, trigger, true);
  assert.equal(image.style.viewTransitionName, 'bop-photo');
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(image.style.viewTransitionName, '');
});

test('a rejected or throwing transition never blocks or doubles the UI update', async () => {
  for (const afterUpdate of [false, true]) {
    const { image, trigger } = environment({ start: callback => { if (afterUpdate) callback(); throw new Error('transition unavailable'); } });
    let changes = 0;
    galleryTransition(() => changes++, trigger);
    assert.equal(changes, 1);
    assert.equal(image.style.viewTransitionName, '');
  }
  const { image, trigger } = environment({ start: callback => { callback(); return { finished: Promise.reject(new Error('skipped')) }; } });
  galleryTransition(() => {}, trigger);
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(image.style.viewTransitionName, '');
});
