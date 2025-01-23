import { useState } from "react"

// This is a mock API call. In a real application, you'd submit data to your backend.
const submitResultToAPI = async (matchId, result) => {
  // Simulating API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log("Submitted result:", { matchId, result })
  return { success: true }
}

export function useResultSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitResult = async (matchId, result) => {
    setIsSubmitting(true)
    try {
      await submitResultToAPI(matchId, result)
      setIsSubmitting(false)
      return true
    } catch (error) {
      console.error("Error submitting result:", error)
      setIsSubmitting(false)
      return false
    }
  }

  return { submitResult, isSubmitting }
}

