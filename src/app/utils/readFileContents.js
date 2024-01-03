import fs from 'fs';

const readFileContent = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
};

export default readFileContent;