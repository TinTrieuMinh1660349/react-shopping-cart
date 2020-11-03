export default function formatCurrency(Num){
    return "$" + +Num.toFixed(1).toLocaleString() + " ";
}
