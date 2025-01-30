import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = (body.file as Blob) || null;
    console.log(body);

    try {
        return NextResponse.json({ Message: "Success", status: 201 });
    } catch (err) {
        console.error("Error during file upload:", err);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
};