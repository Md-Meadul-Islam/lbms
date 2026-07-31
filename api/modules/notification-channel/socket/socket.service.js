import { Server } from "socket.io";

class SocketService {
  constructor() {
    this.io = null;

    /*
        |--------------------------------------------------------------------------
        | Connected Users
        |--------------------------------------------------------------------------
        |
        | userId => Set(socketIds)
        |
        */

    this.connectedUsers = new Map();
  }

  /*
    |--------------------------------------------------------------------------
    | Initialize
    |--------------------------------------------------------------------------
    */

  initialize(server, options = {}) {
    this.io = new Server(server, {
      cors: {
        origin: "*",

        methods: ["GET", "POST"],
      },

      ...options,
    });

    return this.io;
  }

  /*
    |--------------------------------------------------------------------------
    | Register User
    |--------------------------------------------------------------------------
    */

  registerUser(userId, socketId) {
    userId = userId.toString();

    if (!this.connectedUsers.has(userId)) {
      this.connectedUsers.set(
        userId,

        new Set(),
      );
    }

    this.connectedUsers

      .get(userId)

      .add(socketId);
  }

  /*
    |--------------------------------------------------------------------------
    | Remove User
    |--------------------------------------------------------------------------
    */

  removeUser(socketId) {
    for (const [userId, sockets] of this.connectedUsers.entries()) {
      sockets.delete(socketId);

      if (sockets.size === 0) {
        this.connectedUsers.delete(userId);
      }
    }
  }

  /*
    |--------------------------------------------------------------------------
    | Get User Sockets
    |--------------------------------------------------------------------------
    */

  getUserSockets(userId) {
    return this.connectedUsers.get(userId.toString()) || new Set();
  }

  /*
    |--------------------------------------------------------------------------
    | Is User Online
    |--------------------------------------------------------------------------
    */

  isOnline(userId) {
    return this.connectedUsers.has(userId.toString());
  }

  /*
    |--------------------------------------------------------------------------
    | Send To User
    |--------------------------------------------------------------------------
    */

  sendToUser(
    userId,

    event,

    payload,
  ) {
    if (!this.io) {
      return;
    }

    const sockets = this.getUserSockets(userId);

    for (const socketId of sockets) {
      this.io.to(socketId).emit(
        event,

        payload,
      );
    }
  }

  /*
    |--------------------------------------------------------------------------
    | Send To Multiple Users
    |--------------------------------------------------------------------------
    */

  sendToUsers(
    userIds,

    event,

    payload,
  ) {
    for (const userId of userIds) {
      this.sendToUser(
        userId,

        event,

        payload,
      );
    }
  }

  /*
    |--------------------------------------------------------------------------
    | Broadcast
    |--------------------------------------------------------------------------
    */

  broadcast(
    event,

    payload,
  ) {
    if (!this.io) {
      return;
    }

    this.io.emit(
      event,

      payload,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Online Users
    |--------------------------------------------------------------------------
    */

  getOnlineUsers() {
    return [...this.connectedUsers.keys()];
  }

  /*
    |--------------------------------------------------------------------------
    | Total Connections
    |--------------------------------------------------------------------------
    */

  getConnectionCount() {
    let count = 0;

    for (const sockets of this.connectedUsers.values()) {
      count += sockets.size;
    }

    return count;
  }
}

export default new SocketService();
/**
 * socket.emit(

    "register",

    user.id

);
 */
