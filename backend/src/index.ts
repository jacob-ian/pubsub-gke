import { Api } from "./api/Api";

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const api = new Api(port);

api.listen();
