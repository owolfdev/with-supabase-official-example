import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function Login({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const updatePassword = async (formData: FormData) => {
    "use server";

    const newPassword = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Assuming you are using something like React and React Router
    // let queryParams = new URLSearchParams(window.location.search);
    const code = searchParams.code;

    await supabase.auth.exchangeCodeForSession(code);

    console.log("code", searchParams.code);

    if (newPassword === confirmPassword) {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.log(error);
      } else {
        // password updated successfully
      }
    } else {
      // passwords do not match error
    }

    // const { error } = await supabase.auth.resetPasswordForEmail(email, {
    //   redirectTo: "http://localhost:3000/reset-password",
    // });

    return redirect("/");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={updatePassword}
      >
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="password"
          placeholder="password"
          required
        />
        <label className="text-md" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="confirmPassword"
          placeholder="confirm password"
          required
        />
        <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
          Update Password
        </button>
      </form>
    </div>
  );
}
