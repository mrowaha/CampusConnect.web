/**
 * Deprecated! Please Prefer Bulk Image Downloads with useProfilePicture
 */
import { BACKEND_URL } from "@/routes";
import { useSnackbar } from "@/store/snackbar";
import * as React from "react";

type ProductImgsInfo = {
  fileNamePrefixes : string[];
  totalCount: number;
}

type ImageInfo = {
  fileName : string;
  url : string;
}

function buildProductInfoUrl(productId : string) {
  return `${BACKEND_URL}/products/${productId}/images`;
}

function buildProductImgStepUrl(productId : string, index : number) {
  return `${BACKEND_URL}/s3/product-pictures/${productId}/${index}`
}

export default function useIncrementalProductPictures(productId : string) {
  const [productImgInfo, SetProductImgInfo] = React.useState<ProductImgsInfo | null>(null);
  const [currIndex, setCurrIndex] = React.useState<number>(0);
  const [imgInfos, setImgInfos] = React.useState<ImageInfo[]>([]);

  const snackbar = useSnackbar();
  const fetchProductImgInfo = async () => {
    try {
      let res = await fetch(buildProductInfoUrl(productId));
      if (!res.ok){
        snackbar("error", "an error occured");
        console.error(res);
        return;
      }
      let data = await res.json();
      SetProductImgInfo(data);
      setTimeout(next, 500);
    } catch (err) {
      snackbar("error", "an error occured");
      console.error(err);
    }
  }

  const next = React.useCallback(async () => {
    if (productImgInfo === null) return;
    if (currIndex === productImgInfo.totalCount) return;
    try {
      const res = await fetch(buildProductImgStepUrl(productId, currIndex));
      if (!res.ok)  {
        snackbar("error", "error occured loading images");
        console.error(res);
        return;
      } 
      const contentDisposition = res.headers.get('Content-Disposition');
      if (!contentDisposition) {
        snackbar("error", "server error");
        console.log("No content disposition headers");
        return;
      }
      const filename = contentDisposition.split("=").at(-1) as string;
      if(imgInfos.some(info => info.fileName === filename)) return;
      const data = await res.blob();
      setImgInfos(prev => [...prev, {
        fileName : filename,
        url : URL.createObjectURL(data)
      }])
      setCurrIndex(prev => prev+1);
    } catch (err) {
      snackbar("error", "an error occured");
      console.log(err);
    }
  }, [productId, productImgInfo, currIndex]);

  React.useEffect(() => {
    if(productId) {
      fetchProductImgInfo();
    }
  }, [productId]);

  return [imgInfos, next] as const;

}