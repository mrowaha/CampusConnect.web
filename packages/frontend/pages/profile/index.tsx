import * as React from "react";

import ProfilePageLayout from "@/layouts/profile";



function ProfilePage() {
  return (
    <h1>Profile</h1>
  )
}


ProfilePage.getLayout = (page : React.ReactNode) => {
  return <ProfilePageLayout>{page}</ProfilePageLayout>
}

export async function getStaticProps() {
  return {
    props : {
      protected : false
    }
  }
}


export default ProfilePage;