import { z } from "zod";

const formSchema = z.object({
  item: z.string().min(1, "Wajib diisi"),
});

export default formSchema;
