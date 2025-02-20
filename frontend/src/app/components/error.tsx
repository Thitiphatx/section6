"use client"

import { Button } from "primereact/button"

export default function ErrorPage({ message }: { message: string }) {
  return (
    <div>
        <p>{message}</p>
        <Button label="back"/>
    </div>
  )
}
