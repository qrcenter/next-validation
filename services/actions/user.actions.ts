import { loginSchema } from "@/lib/schemas";
import { LoginActionResult } from "@/lib/types";
import { parseWithZod } from "@conform-to/zod";

export async function login(
  prevState: unknown,
  formData: FormData
): Promise<LoginActionResult> {
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    console.log(data);
    const res: LoginActionResult = {
      ...submission.reply(),
      user: data,
      message: "sucessssss",
    };

    return res;
  } catch (error) {
    console.log(error);
    return {
      ...submission.reply(),
      message: "An error occurred while fetching user data.",
    };
  }
}
