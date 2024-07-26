import { ProjectToDescriptionKeyPipe } from './map-to-description-key.pipe';

describe('MapToDescriptionKeyPipe', () => {
  it('create an instance', () => {
    const pipe = new ProjectToDescriptionKeyPipe();
    expect(pipe).toBeTruthy();
  });
});
