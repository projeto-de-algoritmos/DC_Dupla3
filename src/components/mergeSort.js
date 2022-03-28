const merge = (left, right) => {
    const temp = [];

    while (left.length && right.length) temp.push(left[0] < right[0] ? left.shift() : right.shift());
    while (left.length) temp.push(left.shift())
    while (right.length) temp.push(right.shift())

    return temp;
}

// recebe um array e ordena 
const mergeSort = (arr) => {
    if (arr.length < 2) return arr;

    const middle = Math.floor(arr.length / 2);

    const left = arr.slice(0, middle);
    const right = arr.slice(middle, arr.length);

    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    return merge(sortedLeft, sortedRight)
}

export default mergeSort;
//const x = mergeSort(['elefante', 'galinha', 'abelha', 'dromedálio', 'foca', 'cachorro', 'baleia', 'boi'])
//console.log(x)