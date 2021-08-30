import { Api } from "./api/Api";

const port = process.env.PORT as number | undefined;
const api = new Api(port || 3001);

api.listen();
