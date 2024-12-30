"use client"
import { importImage } from "@/app/server-action/import"
import { useActionState } from "react";


export default function Page() {
    const [state, formAction] = useActionState(importImage, null);
  return (
    <form action={formAction}>
        <input name="images" type="file" multiple/>
        <button>import</button>
    </form>
  )
}
