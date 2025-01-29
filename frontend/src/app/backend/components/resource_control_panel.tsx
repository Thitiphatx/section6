"use client"

export default function ResourceControlPanel() {
    return (
        <>
            <div className="join">
                <select className="select select-bordered w-full max-w-xs join-item">
                    <option disabled>Normal</option>
                    <option>Normal Apple</option>
                    <option>Normal Orange</option>
                    <option>Normal Tomato</option>
                </select>
                <button className="btn btn-primary join-item">prediction</button>
            </div>
            <button className="btn btn-error">delete</button>
        </>
    )
}