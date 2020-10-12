module.exports.toNumber = ({ low, high }) => {
    let res = high
  
    for (let i = 0; i < 32; i++) {
      res *= 2
    }
  
    return low + res
  }