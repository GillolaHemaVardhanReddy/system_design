const dgram = require('dgram');

function encodeName(name) {
    let n = name.length;
    let nameArray = name.split('.');
    let finalans = nameArray.map((word)=> {
        let length = word.length;
        let buff = Buffer.from(word);
        return Buffer.concat([Buffer.from([length]), buff]);
    });
    return Buffer.concat([...finalans, Buffer.from([0])]);
}


function buildHeader() {
    const buf = Buffer.alloc(12);        // 12 zeros
    const id = Math.floor(Math.random() * 65536);
  
    buf.writeUInt16BE(id, 0);            // ticket number
    buf.writeUInt16BE(0, 2);             // flags
    buf.writeUInt16BE(1, 4);             // 1 question
  
    return buf;
}


function buildQuery(name) {
    const question = Buffer.alloc(4);
    question.writeUInt16BE(1, 0);   // TYPE  = A
    question.writeUInt16BE(1, 2);   // CLASS = IN
  
    return Buffer.concat([ buildHeader(), encodeName(name), question ]);
}



const query  = buildQuery('google.com');
const socket = dgram.createSocket('udp4');

socket.on('message', (reply) => {
  console.log('got', reply.length, 'bytes');
  console.log('sent id', query.readUInt16BE(0));
  console.log(reply);
  console.log('recieved_id', reply.readUInt16BE(0));
  socket.close();
});

socket.send(query, 53, '198.41.0.4');