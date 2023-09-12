const getUserPosition = (): [number, number] | null => {
  if (navigator.geolocation) {
    let result = null
    navigator.geolocation.getCurrentPosition(
      pos => {
        let lng = pos.coords.longitude,
          lat = pos.coords.latitude
        result = [lng, lat]
      },
      err => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            throw new Error("请打开定位")
          case err.POSITION_UNAVAILABLE:
            throw new Error("定位失败，请尝试刷新")
          case err.TIMEOUT:
            throw new Error("请求超时，请尝试刷新")
          default:
            throw new Error("定位时发生了未知错误")
        }
      })
    return result
  }
  return null
}

export default getUserPosition
