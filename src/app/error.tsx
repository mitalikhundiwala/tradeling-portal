"use client";

interface ErrorPageProps {
  error: Error; // 'Error' is the built-in JavaScript error type
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <>
      <h2>An error occurred!</h2>
      <p>Unfortunately, something went wrong.</p>
      <p>{error.message}</p>
    </>
  );
}
