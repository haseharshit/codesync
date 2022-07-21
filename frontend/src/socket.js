import { io } from 'socket.io-client';

export const initSocket = async () => {
    // console.log("Trying");
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io(('/'), options);
};