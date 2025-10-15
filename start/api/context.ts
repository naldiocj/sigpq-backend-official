import fs from "fs";
import path from "path";

export default function (
  base = ".",
  scanSubDirectories = false,
  regularExpression = /\.ts$/
) {
  const files = {};

  function readDirectory(directory) { 
    
    fs.readdirSync(directory).forEach((file) => {
      const fullPath = path.resolve(directory, file);
      
      
      if (fs.statSync(fullPath).isDirectory()) { 
        if (scanSubDirectories) readDirectory(fullPath);

        return;
      }

      if (!regularExpression.test(fullPath))  return;

      files[fullPath] = true;
 
      
    });
  } 
  
  readDirectory(path.resolve(__dirname, base));

  function Module(file) {
    return require(file);
  }

  Module.keys = () => Object.keys(files);

  return Module;
};
