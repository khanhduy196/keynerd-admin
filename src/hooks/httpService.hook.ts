import axios, { AxiosError, HttpStatusCode } from "axios";
import { useCallback, useEffect, useState } from "react";

type HttpErrorType = AxiosError<IHttpError> | undefined;

// interface IHttpQueryRequestOption {
//   enabled: boolean;
// }

interface IHttpRequestParam<TResponse> {
  request?: () => Promise<TResponse>;
  // requestOption?: IHttpQueryRequestOption;
  onLoad?: () => void;
  onCompleted?: () => void;
}

interface IHttpQueryResponse<TResponse> {
  result: TResponse | undefined;
  refetch: (currentRequest: () => Promise<TResponse>) => Promise<void>;
  error: HttpErrorType;
  isLoading: boolean;
}

export const useHttpQueryService = <TResponse>({
  request,
}: IHttpRequestParam<TResponse>): IHttpQueryResponse<TResponse> => {
  const [result, setResult] = useState<TResponse>();
  const [error, setError] = useState<HttpErrorType>();
  const [isLoading, setIsLoading] = useState<boolean>(!!request);

  const fetch = useCallback(
    async (currentRequest: () => Promise<TResponse>) => {
      setIsLoading(true);
      try {
        const res = await currentRequest();
        setResult(res);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (request) {
      fetch(request);
    }
  }, []);

  return { result, error, isLoading, refetch: fetch };
};

interface IHttpMutationParams<Tpayload, TResponse> {
  request: (payload?: Tpayload) => Promise<TResponse>;
  onLoad?: () => void;
  onCompleted?: () => void;
}

interface IHttpMutationResponse<Tpayload, TResponse> {
  mutate: (params?: Tpayload) => Promise<TResponse | undefined>;
  result: TResponse | undefined;
  error: HttpErrorType;
  isLoading: boolean;
}

interface IHttpError {
  error: string;
  message: string;
  statusCode: HttpStatusCode;
}

export const useHttpMutationService = <Tpayload, TResponse>({
  request,
}: IHttpMutationParams<Tpayload, TResponse>): IHttpMutationResponse<
  Tpayload,
  TResponse
> => {
  const [result, setResult] = useState<TResponse>();
  const [error, setError] = useState<HttpErrorType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutate = useCallback(
    async (payload?: Tpayload) => {
      setIsLoading(true);
      try {
        const result = await request(payload);
        setResult(result);
        setIsLoading(false);
        return result;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err);
        }

        setIsLoading(false);
      }
    },
    [request]
  );

  return { mutate, result, error, isLoading };
};
