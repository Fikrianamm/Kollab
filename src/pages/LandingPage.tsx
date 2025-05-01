import React from "react";
import { Construction, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="max-w-md w-full mx-auto">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Construction className="text-blue-400 h-20 w-20 animate-pulse" />
            <Wrench
              className="absolute -top-2 -right-2 text-amber-500 h-8 w-8 animate-spin"
              style={{ animationDuration: "3s" }}
            />
          </div>
        </div>

        <Card className="border-slate-800 bg-slate-900 shadow-lg">
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold mb-4 text-white">
              <span className="text-blue-400">Kollab</span> Under Construction
            </h1>

            <p className="text-slate-300 mb-6">
              We are building the best collaboration platform that will
              revolutionize the way you work with your team.
            </p>

            <Alert className="bg-slate-800 border-blue-900 text-left mb-6">
              <AlertTitle className="text-blue-400 flex items-center gap-2">
                <Wrench className="h-4 w-4" /> Project Status
              </AlertTitle>
              <AlertDescription className="text-slate-300">
                Website under construction. Please check back later to see our
                finished platform.
              </AlertDescription>
            </Alert>

          </CardContent>
        </Card>

        <div className="text-slate-500 mt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} Kollab. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
