process.env.TZ = "America/Sao_Paulo";

import dotenv from "dotenv";

dotenv.config();

import { App } from "./app";
import { PORT } from "constants/env";
import { Logger } from "./utils/Logger";

const appInstance = new App();

appInstance.app.listen(PORT, () => {
  Logger.success(`Server running on port ${PORT}`);
});
