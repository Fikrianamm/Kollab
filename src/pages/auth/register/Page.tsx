import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Become a Leader on Kollab
        </CardTitle>
        <CardDescription className="text-center">
          Sign up as a leader to create your workspace, manage projects, and
          assign tasks to your team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </>
  );
}
