import React from "react";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import FormComponent from "./form";
import DataList from "./data-list";

async function TodosPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const user = await supabase.auth.getUser();

  const { data } = await supabase.from("todos").select("*");

  return (
    <div className="p-24 flex flex-col gap-4">
      <div className="font-bold">{user?.data?.user?.email}'s Todos:</div>
      <div className="mb-6">
        <DataList data={data} />
      </div>
      <div className="font-bold">Add a todo:</div>
      <FormComponent />
    </div>
  );
}

export default TodosPage;
