const colors = {
  reset: "\x1b[0m",

  green: "\x1b[32m",

  yellow: "\x1b[33m",

  red: "\x1b[31m",

  cyan: "\x1b[36m",
};

const format = (level, color, message) => {
  return `${color}[${new Date().toISOString()}] ${level}: ${message}${colors.reset}`;
};

const logger = {
  info(message) {
    console.log(format("INFO", colors.green, message));
  },

  warn(message) {
    console.warn(format("WARN", colors.yellow, message));
  },

  error(message) {
    console.error(format("ERROR", colors.red, message));
  },

  http(message) {
    console.log(format("HTTP", colors.cyan, message));
  },
};

export default logger;
