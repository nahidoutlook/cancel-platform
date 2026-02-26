"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function updateBrand(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const metaTitle = formData.get("meta_title") as string;
  const metaDescription = formData.get("meta_description") as string;
  const isPublished = formData.get("is_published") === "on";

  if (!id) throw new Error("Missing brand ID");

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const { error } = await supabase
    .from("brands")
    .update({
      name,
      slug,
      description,
      meta_title: metaTitle,
      meta_description: metaDescription,
      is_published: isPublished,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/brands");
}



export async function createBrand(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const metaTitle = formData.get("meta_title") as string;
  const metaDescription = formData.get("meta_description") as string;

  if (!name) {
    throw new Error("Brand name is required");
  }

  const slug = generateSlug(name);

  const { error } = await supabase.from("brands").insert({
    name,
    slug,
    description,
    meta_title: metaTitle,
    meta_description: metaDescription,
    is_published: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/brands");
}