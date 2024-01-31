"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

function DataList({ data }: any) {
  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await supabase.auth.getUser();
      //   console.log("Current User:", currentUser.data.user);
      setUser(currentUser.data.user);
    };
    getUser();
  }, []);

  const handleDelete = async (id: any) => {
    console.log("Delete:", id);
    try {
      const { error } = await supabase.from("notes").delete().match({ id });

      if (error) {
        console.error("Error deleting data:", error);
      } else {
        console.log("Data deleted");
        router.refresh();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>
        {data?.map((note: any) => (
          <div key={note.id}>
            {note.title}{" "}
            {user && (
              <button
                onClick={() => handleDelete(note.id)}
                className="bg-red-500 rounded text-xs px-1"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataList;
