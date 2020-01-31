const ipAddress = {
  ip: '',
  get ipAddress () {
    return this.ip
  },
  set ipAddress (ip) {
    const updatedIp = window.location.hostname === 'localhost' ? '65.656.565' : ip
    this.ip = updatedIp
  }
}

export default ipAddress
