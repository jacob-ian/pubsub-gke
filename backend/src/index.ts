import { Api } from "./api/Api";

const port = process.env.PORT as number | undefined;
const api = new Api(port || 3000);

api.listen();
