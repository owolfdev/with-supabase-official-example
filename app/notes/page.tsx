import React from "react";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import FormComponent from "./form";
import DataList from "./data-list";

async function DataPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.from("notes").select("*");

  return (
    <div className="p-24 flex flex-col gap-4">
      <div className="font-bold">Notes:</div>
      <div className="mb-6">
        <DataList data={data} />
      </div>
      <div className="font-bold">Add a note:</div>
      <FormComponent />
    </div>
  );
}

export default DataPage;
