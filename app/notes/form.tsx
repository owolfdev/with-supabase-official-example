"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

function FormComponent() {
  const supabase = createClient();

  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");
    console.log("Title:", title);

    try {
      const { data, error } = await supabase.from("notes").insert([{ title }]);

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
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="your note"
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
