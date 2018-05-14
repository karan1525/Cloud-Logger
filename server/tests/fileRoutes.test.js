const request = require('supertest');
const app = require('../index.js');
const fileFunctions = require('../file/fileFunctions.js');

describe('Checking file routes', () => {
  test('finding existent file', done => {
    fileFunctions.file_find('test_user', 'test.txt', (err, valid) => {
      expect(valid).toBe('fileNameExist');
    });
    done();
  });

  test('deleting test_user_file', done => {
    request(app)
      .delete('/delete/file/test_user/test.txt')
      .then(response => {
        expect(response.statusCode).toBe(200);
        fileFunctions.file_find('test_user', 'test.txt', (err, valid) => {
          expect(valid).toBe('validFile');
        });
        done();
      });
  });

  test('finding existent file', done => {
    fileFunctions.file_find('test_user', 'test.txt', (err, valid) => {
      expect(valid).toBe('validFile');
    });
    done();
  });
});

describe('Testing the file routes', () => {
  test('uploading the test.txt file', done => {
    request(app)
      .post('/api/upload')
      .field('userId', 'test_user')
      .attach('fileUploaded', './tests/test.txt')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
