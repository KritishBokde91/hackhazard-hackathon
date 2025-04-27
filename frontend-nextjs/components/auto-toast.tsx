"use client";

import { useNotification } from "@/hooks/stores/use-notification";
import { toast } from "sonner";
import { useEffect } from "react";

const AutoToast = () => {
    const { error, message , resetError , resetMessage } = useNotification();

  useEffect(() => {
    console.log("runnin")
        if (message) {
            toast( "Success" , {
                description: message,
                duration: 5000,
            });
        }
        if (error ) {
            toast( "Error" , {
                description: error  ,
                duration: 5000,
            });
        }

    // cleanup
    return () => {
        resetError();
        resetMessage();
    };
    }, [error,  message , resetMessage , resetError]);
    return null;
}

export default AutoToast;
