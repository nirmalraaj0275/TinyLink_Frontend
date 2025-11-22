// import { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import Layout from "@/layout/layouts";
import Loader from "@/components/Loader";

export default function CodeStats() {


 

 

  return (
    <Layout>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Stats for</h2>
        <Link to="/" className="text-sm text-blue-600 underline">
          ← Back to dashboard
        </Link>
      </div>

     

    
    </Layout>
  );
}
