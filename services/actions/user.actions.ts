import { loginSchema } from "@/lib/schemas";
import { ActionResult, User } from "@/lib/types";
import { parseWithZod } from "@conform-to/zod";

export async function login(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult<User>> {
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
    const res: ActionResult<User> = {
      ...submission.reply(),
      resData: data,
      resMessage: "User added successfuly",
    };

    return res;
  } catch (error) {
    console.log(error);
    return {
      ...submission.reply(),
      resMessage: "An error occurred while fetching user data.",
    };
  }
}
