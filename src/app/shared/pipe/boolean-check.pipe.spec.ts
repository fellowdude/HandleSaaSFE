import { BooleanCheckPipe } from './boolean-check.pipe';

xdescribe('BooleanCheckPipe', () => {
  it('create an instance', () => {
    const pipe = new BooleanCheckPipe();
    expect(pipe).toBeTruthy();
  });
});
