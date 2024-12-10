export const isArray = (obj: any) => {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

export const filterNone = (obj: any) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => value)
    )
}

// TODO: write new one
export const arabic2Chinese = (num: number) => {
    // only for 0 - 99999
    const chineseNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const chineseUnit = ['', '十', '百', '千', '万'];

    const str_nums = `${num}`.split('').reverse()

    let raw_nums = str_nums.reduce((acc, num, index) => {
        let _num = Number(num)

        if (_num == 0) {
            // process repeat zero
            if (acc.startsWith(chineseNum[0]))
                return acc
            return `${chineseNum[_num]}${acc}`
        }else {
            return `${chineseNum[_num]}${chineseUnit[index]}${acc}`
        }
    }, "")

    if (raw_nums.endsWith(chineseNum[0]))
        raw_nums = raw_nums.slice(0,-1)

    return raw_nums
}