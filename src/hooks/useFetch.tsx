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

type Result<T> = [(url: string, options: Options) => Promise<void>, T | null];

export default function useFetch<T>(): Result<T> {
  const [result, setResult] = useMountedState<T | null>(null);

  const request = useCallback(
    async (url: string, options: Options) => {
      const response = await fetch(url, options);
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
    [setResult]
  );
  return [request, result];
}
