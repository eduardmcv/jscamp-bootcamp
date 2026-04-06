import os from "node:os";
import ms from "ms";

console.log("OS Type:", os.type());
console.log("OS Platform:", os.platform());
console.log("OS Architecture:", os.arch());
console.log("Total Memory:", os.totalmem());
console.log("Free Memory:", os.freemem());
console.log("CPU Cores:", os.cpus().length);
console.log("Home Directory:", os.homedir());
console.log("Activity Uptime (seconds):", ms(os.uptime() * 1000));
