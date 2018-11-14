import Rx from 'rxjs';
//import filter from 'rxjs/operators/filter';
import { webSocket } from 'rxjs/websocket';

const subject = webSocket({
    url: 'ws://localhost:8080', 
    binaryType: 'arraybuffer',
    serializer: m => m as any,
    deserializer: (e: MessageEvent) => e as any
});

//subject.pipe(filter())

export const api = subject;
