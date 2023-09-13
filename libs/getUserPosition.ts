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
            console.error("请打开定位")
          case err.POSITION_UNAVAILABLE:
            console.error("定位失败，请尝试刷新")
          case err.TIMEOUT:
            console.error("请求超时，请尝试刷新")
          default:
            console.error("定位时发生了未知错误")
        }
      })
    return result
  }
  return null
}

export default getUserPosition
