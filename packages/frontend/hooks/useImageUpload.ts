import * as React from "react";

import type { RequestMethod, S3Route } from "./types";
import { BACKEND_URL } from "@/routes";
import { AUTH_TOKEN } from "@/auth";

export function useImageUpload<R, E>(
  auth : boolean,
  method : RequestMethod,
  header : Omit<HeadersInit, "Authorization"> | null,
  endpoint: S3Route 
) {

  const [imageBlob, setImageBlob] = React.useState<Blob | null>(null);
  const [response, setResponse] = React.useState<R | null>(null);
  const [error, setError] = React.useState<E | null>(null);

  const [innerHeader, setInnerHeader] = React.useState<HeadersInit | undefined>(undefined);

  const handleImageSelect = React.useCallback((filelist : FileList | null) => {
    if (filelist === null) {
      setImageBlob(null);
    } else {
      setImageBlob(filelist[0]);
    }
  }, []);

  React.useEffect(() => {
    if (auth) {
      const token = localStorage.getItem(AUTH_TOKEN);
      console.log(token);
      setInnerHeader(() => {
        if (header) {
          return {
            ...header,
            "Authorization" : `Bearer ${token}`
          } as HeadersInit
        }
        return {
          "Authorization" : `Bearer ${token}`
        } as HeadersInit
      })
    }
  }, [auth, header])

  const makeRequest = async () => {
    if (imageBlob) {
      const formData = new FormData();
      formData.append("file", imageBlob);
      
      try{
        const res = await fetch(`${BACKEND_URL}${endpoint}`, {
          method: method,
          headers : innerHeader,
          body: formData,
        })
        const data : R = await res.json();
        setResponse(data);
        setError(null);  
      } catch (e) {
        setError(e as E);
        setResponse(null);
      }
    } 
  }

  return [
    imageBlob,
    handleImageSelect,
    makeRequest,
    response,
    error
  ] as const;
}