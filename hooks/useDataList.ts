import { IListData } from "@/types/IListData";
import { useEffect, useState } from "react";

export const useDataList = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchData: (page: number, ...params: any[]) => Promise<IListData<T>>,
  disableScrollTop?: boolean,
  initialData?: T[]
) => {
  const [data, setData] = useState<T[]>(initialData || []);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { totalCount, data } = await fetchData(1);
        setTotalCount(totalCount);
        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to load data");
        }
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdateData = async (page: number, ...params: unknown[]) => {
    try {
      setUpdateLoading(true);
      const res = await fetchData(page, ...params);
      setData(res.data);
      if (page !== curPage && !disableScrollTop) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      setTotalCount(res.totalCount);
      setCurPage(page);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setData([]);
    } finally {
      setUpdateLoading(false);
    }
  };

  const onDelete = async (page: number, ...params: unknown[]) => {
    const pageCond = data.length === 1 && page > 1 ? page - 1 : page;
    await onUpdateData(pageCond, ...params);
  };

  return {
    data,
    onUpdateData,
    onDelete,
    loading,
    updateLoading,
    curPage,
    error,
    setError,
    setData,
    totalCount,
  };
};
