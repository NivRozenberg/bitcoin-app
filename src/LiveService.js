import { io, Socket } from "socket.io-client";


class LiveService {

    socket = new Socket;

     connect() {
        this.socket = io("wss://wstest.fxempire.com?token=btctothemoon");
    }

    // public disconnect(): void {
    //     this.socket.disconnect();
    // }

    // public send(msg: VacationModel): void {
    //     this.socket = io("http://localhost:3001");
    //     this.socket.emit("msg-from-client", msg);
    // }

    // public send2(id: number):void{
    //     this.socket = io("http://localhost:3001");
    //     this.socket.emit("msg-from-client-delete", id);
    // }


}

export default LiveService;
