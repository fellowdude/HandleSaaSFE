import { SaveVideoPipe } from './save-video.pipe';

xdescribe('SaveVideoPipe', () => {
  it('create an instance', () => {
    const pipe = new SaveVideoPipe(null);
    expect(pipe).toBeTruthy();
  });
});
