// Frontend Test Submission/src/loggingMiddleware.js
export async function Log(stack, level, pkg, message, token) {
  try {
    await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });
  } catch (e) {
    // Fail silently
  }
}
