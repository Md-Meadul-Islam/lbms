import EventEmitter from "events";

class EventBus extends EventEmitter {
  constructor() {
    super();

    /*
        |--------------------------------------------------------------------------
        | Unlimited listeners
        |--------------------------------------------------------------------------
        */

    this.setMaxListeners(0);
  }
}

export default new EventBus();
