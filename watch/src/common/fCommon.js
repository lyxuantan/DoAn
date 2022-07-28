export function thousandsSeparators(num){
    if (num === null || num === undefined) return "0";
    if (isNaN(num)) return Number(num);
    let num_parts =  "";
    if (Number(num)?.toString()?.includes(".")) {
        num_parts = Number(num).toFixed(2).toString().split(".");
    } else {
        num_parts = Number(num).toString().split(".");
    }
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return num_parts.join(",");
}

export function formatCurrency(num) {
    return `${thousandsSeparators(num)} đ`;
}

export const numberToString = (num) => {
    const si = [
        {v: 1e3, s: "Nghìn"},
        {v: 1e6, s: "Triệu"},
        {v: 1e9, s: "Tỷ"},
        {v: 1e12, s: "Nghìn Tỷ"},
        {v: 1e15, s: "Triệu Tỷ"},
    ];
    if (num === null || num === 0 || num === undefined) return 0;
    if (num > 0) {
        if (num < 1000) {
            return thousandsSeparators(num);
        }
        let i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].v) {
                break;
            }
        }
        return (
            (num / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1").replace(".", ",") + " " +
            si[i].s
        );
    }
    else {
        const positiveNumbers = Math.abs(num);
        if (positiveNumbers < 1000) {
            return "-"+thousandsSeparators(positiveNumbers);
        }
        let i;
        for (i = si.length - 1; i > 0; i--) {
            if (positiveNumbers >= si[i].v) {
                break;
            }
        }
        return (
            "-"+(positiveNumbers / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1").replace(".", ",") + " " +
            si[i].s
        );
    }
};