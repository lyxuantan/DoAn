export function thousandsSeparators(num){
    if (num === null || num === undefined) return "";
    if (isNaN(num)) return Number(num);
    let num_parts =  "";
    if (Number(num).toString().includes(".")) {
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