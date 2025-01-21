"use client"

export default function Navbar() {
  return (
    <div className="bg-zinc-800">
      Backend
      <ul>
          <li><a href="/backend/import" className="text-green-400">import</a></li>
          <li><a href="/backend/resources" className="text-green-400">resources</a></li>
          <li><a href="/backend/segmentation" className="text-green-400">segmentation</a></li>
      </ul>
    </div>
  )
}
