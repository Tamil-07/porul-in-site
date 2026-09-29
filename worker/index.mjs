// Generated route allowlist makes every representation match the published build.
import routes from "../.generated/routes.json";
import { handler } from "./handler.mjs";
export default { fetch: handler(routes) };
