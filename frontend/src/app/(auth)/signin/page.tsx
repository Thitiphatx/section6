import prisma from "@/app/lib/prisma";
import SignInForm from "../components/signin_form";

export default async function SignIn() {
  console.log(await prisma.users.findFirst());
  return (
    <div>
      <SignInForm />
    </div>
  )
}
