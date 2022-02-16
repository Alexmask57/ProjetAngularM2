import * as fs from 'fs';
import {url} from './url.js'

function base64_encode(file) {
  var extension = file.match(/[A-Za-z]+.([A-Za-z]+)$/);

  let bitmap;
  try{
    bitmap = fs.readFileSync(url._imgUrl + "/" + file);
  } catch (e){
    console.error("ERROR IMG : " + e);
    return null;
  }
  return 'data:image/' + extension[1] + ';base64,' + new Buffer(bitmap).toString('base64');
}

function base64_decode(name, buffer, type) {

  try {
    fs.writeFileSync(url._imgUrl + "/" + name + "." + type, buffer);
  } catch (e) {
    console.error("ERROR WHILE DECODING : " + e);
  }
}

export {base64_encode, base64_decode};
