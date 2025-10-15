import { test } from "@japa/runner";
import { Axios } from "Config/axios";

test("Testando as configuração do Axios", async ({ assert }) => {
  const response = await Axios.get("");
  assert.deepEqual(response.data, { hello: 'Hi,the backend is running ...' });
});
