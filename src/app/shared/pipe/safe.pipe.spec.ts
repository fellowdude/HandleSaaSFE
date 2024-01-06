import { SafePipe } from './safe.pipe';

xdescribe('SafePipe', () => {
  it('create an instance', () => {
    const pipe = new SafePipe(null);
    expect(pipe).toBeTruthy();
  });
});
