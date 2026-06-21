export async function fetchReport() {
  const res = await fetch("http://127.0.0.1:5000/report");
  return res.json();
}

export async function predictImage(image: string) {
  const res = await fetch("http://127.0.0.1:5000/predict_frame", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image }),
  });

  return res.json();
}
