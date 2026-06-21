"use client";

import { useEffect, useState } from "react";
import { fetchReport } from "@/lib/api";
import WebcamPredict from "@/components/WebcamPredict";

export default function Dashboard() {

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchReport().then(setData);
  }, []);

  if (!data) {
    return <h2 className="p-6 text-xl">Loading AI Analysis...</h2>;
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Mental Health Dashboard
      </h1>

      <WebcamPredict />

      <h3 className="text-xl font-semibold mt-8 mb-4">
        Predicted Condition:
        <span className="text-blue-600 ml-2">
          {data["Predicted Condition"]}
        </span>
      </h3>

      <div className="grid grid-cols-5 gap-4">

        <Card title="Happy %" value={data["Happy %"]} />
        <Card title="Sad %" value={data["Sad %"]} />
        <Card title="Angry %" value={data["Angry %"]} />
        <Card title="Fear %" value={data["Fear %"]} />
        <Card title="Neutral %" value={data["Neutral %"]} />

      </div>

    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white shadow p-4 rounded">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}%</p>
    </div>
  );
}
