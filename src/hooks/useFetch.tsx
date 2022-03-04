import { useCallback } from "react";
import useMountedState from "./useMountedState";

type Options = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: BodyInit;
  headers?: Headers;
};

type Headers = {
  [key: string]: string;
};

export type Status = "NotAsked" | "Pending" | "Resolved" | "Rejected" | "Unauthorized";

type Result<T> = [(url: string, options: Options) => Promise<void>, T | null, number | null];

export default function useFetch<T>(): Result<T> {
  const [result, setResult] = useMountedState<T | null>(null);
  const [statusCode, setStatusCode] = useMountedState<number | null>(null);

  const request = useCallback(
    async (url: string, options: Options) => {
      const response = await fetch(url, options);
      setStatusCode(response.status);
      let responseJson;
      try {
        const responseText = await response.text();
        if (responseText.length === 0) {
          responseJson = null;
        } else {
          responseJson = JSON.parse(responseText);
        }
      } catch (error) {
        console.log(`Error parsing response from request to ${url}`, error);
      }
      setResult(responseJson)
    },
    [setResult, setStatusCode]
  );
  return [request, result, statusCode];
}
