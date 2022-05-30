module.exports = read

const MSB = 0x80
const REST = 0x7f

function read(buf, offset) {
  offset = offset || 0

  let b = buf[offset]
  let res = 0

  res += b & REST
  if (b < MSB) {
    read.bytes = 1
    return res
  }

  b = buf[offset + 1]
  res += (b & REST) << 7
  if (b < MSB) {
    read.bytes = 2
    return res
  }

  b = buf[offset + 2]
  res += (b & REST) << 14
  if (b < MSB) {
    read.bytes = 3
    return res
  }
  
  b = buf[offset + 3]
  res += (b & REST) << 21
  if (b < MSB) {
    read.bytes = 4
    return res
  }

  b = buf[offset + 4]
  res += (b & REST) * Math.pow(2, 28)
  if (b < MSB) {
    read.bytes = 5
    return res
  }

  b = buf[offset + 5]
  res += (b & REST) * Math.pow(2, 35)
  if (b < MSB) {
    read.bytes = 6
    return res
  }

  b = buf[offset + 6]
  res += (b & REST) * Math.pow(2, 42)
  if (b < MSB) {
    read.bytes = 7
    return res
  }

  b = buf[offset + 7]
  res += (b & REST) * Math.pow(2, 49)
  if (b < MSB) {
    read.bytes = 8
    return res
  }
  
  read.bytes = 0
  throw new RangeError('Could not decode varint')
}
