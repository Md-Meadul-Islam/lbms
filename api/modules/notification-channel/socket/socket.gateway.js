import SocketService from "./socket.service.js";

class SocketGateway {
  initialize(io) {
    io.on("connection", (socket) => {
      socket.on("register", (userId) => {
        SocketService.registerUser(userId, socket.id);
      });

      socket.on("disconnect", () => {
        SocketService.removeUser(socket.id);
      });
    });
  }
}

export default new SocketGateway();
