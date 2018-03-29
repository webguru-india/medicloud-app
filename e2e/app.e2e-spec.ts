import { MedicloudPage } from './app.po';

describe('medicloud App', () => {
  let page: MedicloudPage;

  beforeEach(() => {
    page = new MedicloudPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
