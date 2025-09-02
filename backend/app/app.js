import { startMQTT } from "./controllers/ftb.js";
import { startPublisher} from "./controllers/btf.js";

// Start driver MQTT listener
startMQTT();

// Start publisher for clients
startPublisher();

