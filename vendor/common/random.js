/**
 * 生成结果小数∈(start,end] 整数∈[start,end]
 * @param start
 * @param end
 * @param integer
 * @returns {number}
 */
export default function random(start = 0, end = 1, integer = true) {
    const range = end - start;
    const result = range * Math.random() + start;
    return integer ? Math.floor(result + 0.5) : result;
}
