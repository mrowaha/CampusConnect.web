import { BACKEND_URL } from "@/routes";
import { useSnackbar } from "@/store/snackbar";
import * as React from "react";
import JSZip from "jszip";
import { flushSync } from "react-dom";

type ProductImgsInfo = {
  fileNamePrefixes : string[];
  totalCount: number;
}

function buildProductInfoUrl(productId : string) {
  return `${BACKEND_URL}/products/${productId}/images`;
}

export default function useProductPictures() {

  const [status, setStatus] = React.useState<"loading" | "success" | "error">("loading");
  const [imgUrls, setImgUrls] = React.useState<string[]>([]);
  const snackbar = useSnackbar();

  const fetchImages = React.useCallback(async (productId: string) => {
    console.log(productId);
    try {
      // prefetch image prefixes
      let prefetch = await fetch(buildProductInfoUrl(productId));
      if (!prefetch.ok){
        setStatus("error");
        snackbar("error", "an error occured");
        console.error(prefetch);
        return;
      }
      let prefetchData = await prefetch.json() as ProductImgsInfo;

      const url = `${BACKEND_URL}/s3/product-pictures/${productId}`;
      const res = await fetch(url);
      if (!res.ok) {
        snackbar("error", "an error occured while loading images");
        console.error(res);
      }

      const zipBlob = await res.blob();
      const zip = new JSZip();
      await zip.loadAsync(zipBlob);
      const promises = prefetchData.fileNamePrefixes.map(prefix => {
        const saltedName = productId.replaceAll("-", "");
        console.log(`${saltedName}${prefix}`);
        return zip.file(`${saltedName}${prefix}`)?.async('blob') as Promise<Blob>;
      })
      const blobsAwaits = await Promise.allSettled(promises);
      const blobs = blobsAwaits.map(promise => {if (promise.status === "fulfilled") return promise.value}).filter(blob => blob !== undefined);
      setImgUrls(() => blobs.map(blob => URL.createObjectURL(blob as Blob)));
      console.log(blobs);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      snackbar("error", "error occured. see console window");
      console.log(err);
    }
  }, []);


  return [imgUrls, status, fetchImages] as const;
}
