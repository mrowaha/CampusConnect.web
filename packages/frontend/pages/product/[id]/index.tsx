import { useRouter } from "next/router";
import * as React from "react";

export default function ProductPage() {
  return (
    <h1>Product Page</h1>
  )
}

export async function getStaticProps() {
  return {
    props : {
      protected : true
    }
  }
}