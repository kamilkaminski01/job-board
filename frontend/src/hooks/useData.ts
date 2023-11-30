import { IServerResponse } from 'models/serverResponse'
import { useCallback, useEffect, useState } from 'react'
import axiosDefault from 'setup/axios/defaultInstance'
import { parseApiErrors } from 'utils/parseApiErrors'

interface useDataOptions<T, R, C> {
  dontFetchOnMount?: true
  dataLocation?: 'items' | 'results'
  recordsPerPage?: number
  delayResponse?: number
  transformRequestData?: (data: C | Partial<T>) => any
  transformResponseData?: (data: any) => R
}

const useData = <T, R = T, C = T>(
  endpoint: string,
  { ...options }: useDataOptions<T, R, C> = {}
) => {
  const [data, setData] = useState<R>()
  const [pageCount, setPageCount] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const getData = useCallback(
    async (page?: number): Promise<IServerResponse<R>> => {
      const { dataLocation, recordsPerPage, transformResponseData, delayResponse } = options || {}

      try {
        setIsLoading(true)
        setIsError(false)

        const response = await axiosDefault.get(endpoint, { params: { page } })

        const responseData = dataLocation ? response.data[dataLocation] : response.data
        const expectedData = transformResponseData
          ? transformResponseData(responseData)
          : responseData

        setData(expectedData)
        recordsPerPage && setPageCount(Math.ceil(response.data.count / recordsPerPage))

        return { succeed: true, data: expectedData }
      } catch (error) {
        setIsError(true)

        return parseApiErrors(error)
      } finally {
        delayResponse
          ? setTimeout(() => {
              setIsLoading(false)
            }, delayResponse)
          : setIsLoading(false)
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      endpoint,
      options?.dataLocation,
      options?.transformResponseData,
      options?.recordsPerPage,
      options?.delayResponse
    ]
  )

  const createData = useCallback(
    async (
      data: C,
      requestOptions?: { preventDataRefreshAfterRequest?: boolean }
    ): Promise<IServerResponse<T>> => {
      const { transformRequestData } = options || {}
      const { preventDataRefreshAfterRequest } = requestOptions || {}

      try {
        setIsLoading(true)
        setIsError(false)

        await axiosDefault.post(endpoint, transformRequestData ? transformRequestData(data) : data)

        if (!preventDataRefreshAfterRequest) getData()

        return { succeed: true }
      } catch (error) {
        setIsError(true)

        return parseApiErrors(error)
      } finally {
        setIsLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endpoint, getData, options?.transformRequestData]
  )

  const updateData = useCallback(
    async (data: Partial<T>, id?: number): Promise<IServerResponse<T>> => {
      const { transformRequestData } = options || {}

      try {
        setIsLoading(true)
        setIsError(false)

        const path = id ? endpoint + `${id}/` : endpoint

        await axiosDefault.patch(path, transformRequestData ? transformRequestData(data) : data)

        getData()

        return { succeed: true }
      } catch (error) {
        setIsError(true)

        return parseApiErrors(error)
      } finally {
        setIsLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endpoint, getData, options?.transformRequestData]
  )

  useEffect(() => {
    if (!options.dontFetchOnMount) {
      getData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData])

  return { data, pageCount, isLoading, isError, getData, createData, updateData, setData }
}

export default useData
