export function validateClassification(result: any, type: string) {

  if (type === "passport") {
    return (
      result?.country?.code === "AUS" &&
      result?.documentType?.code === "PASSPORT"
    )
  }

  if (type === "driver_license") {
    return (
      result?.country?.code === "AUS" &&
      result?.documentType?.code === "DRIVERS_LICENCE"
    )
  }

  return true
}