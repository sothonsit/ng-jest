import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: AppComponent;

  beforeEach(() => {
    fixture = new AppComponent();
  })

  it('should have a title ng-jest', () => {
    expect(fixture.title).toEqual('ng-jest');
  })

  it('add 1 + 2 should equal 3', () => {
    expect(fixture.sum(1, 2)).toEqual(3);
  })

})
