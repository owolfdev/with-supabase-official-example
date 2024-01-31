"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

function FormComponent() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await supabase.auth.getUser();
      //   console.log("Current User:", currentUser.data.user);
      setUser(currentUser.data.user);
    };
    getUser();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const todo = formData.get("todo");
    const user_id = user?.id;

    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ todo, user_id }]);

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data inserted:", data);
        event.target.reset();
        router.refresh();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="flex flex-col text-black"
    >
      <label htmlFor="todo">Todo</label>
      <input
        type="text"
        name="todo"
        id="todo"
        placeholder="your todo"
        className="px-1"
      />
      {/* <label htmlFor="content">Content</label>
          <textarea name="content" id="content" cols={30} rows={10}></textarea> */}
      <button className="bg-gray-400 border rounded mt-2" type="submit">
        Submit
      </button>
    </form>
  );
}

export default FormComponent;
