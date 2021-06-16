const fs = require('fs');

test('test_1', () => {
  let data = 4;

  data++;

  if(data == 5){
    fs.writeFileSync('testResult.txt', 'success');
  }
  
  expect(data).toBe(5)
});