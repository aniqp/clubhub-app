import convertTime from "./AnnouncementPost"
import AnnouncementPost from "./AnnouncementPost"
jest.mock('./AnnouncementPost')

describe('MyComponent', () => {
    it('should format the time into a 12 HR format', () => {
      const time = '23:11';
      const expectedOutput = '11:11 PM';
      const result = convertTime(time);
      expect(result).toEqual(expectedOutput);
    });
  });