import app from "./app.js";
import { config } from "./config/appConfig.js";

app.listen(config.port, () => {
  console.log(`🚀 Server running at http://localhost:${config.port}`);
});
