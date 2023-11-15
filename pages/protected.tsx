/**
 * This Page is currently for Protected Route Demo Only
 * Wrap all Protected Pages with ProtectedRoute
 */


import ProtectedRoute from "@/auth";


export default function ProtectedPage() {

  return (
    <ProtectedRoute>
      <h1>Hello</h1>
    </ProtectedRoute>
  )
}