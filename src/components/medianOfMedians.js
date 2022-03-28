const partition = (arr, pivot) => {
    let left = 0;
    let right = arr.length - 1;
    let i = 0;

    while (i <= right) {
        if (arr[i] < pivot) {
            [arr[i], arr[left]] = [arr[left], arr[i]];
            left++;
            i++;
        } else if (arr[i] > pivot) {
            [arr[i], arr[right]] = [arr[right], arr[i]];
            right--;
        } else {
            i++;
        }
    }
    return left;
    
}

// recebe um array de números e retorna seu k-esimo elemento
const medianOfMedians = (arr, k) => {
    if (!arr || arr.length === 0) {
        return;
    }

    return selectPivot(arr, k);
}

const selectPivot = (arr, k) => {

    const groups = [];
    const sortedGroups = [];
    const medians = [];
    let pivot;

    for (let i = 0; i < arr.length; i += 5) {
        groups.push(arr.slice(i, i + 5));
    }

    for(let group of groups) {
        sortedGroups.push(group.sort((a, b) => a - b));
    }

    for (let group of sortedGroups) {
        medians.push(group[Math.floor(group.length / 2)]);
    }

    if(medians.length <= 5) 
        pivot = medians.sort((a, b) => a - b)[Math.floor(medians.length / 2)];
    else {
        pivot = selectPivot(medians, Math.floor(medians.length / 2));
    }

    const part = partition(arr, pivot);


    if (part === k) {
        return pivot;
    }
    else if (part > k) {
        return selectPivot(arr.slice(0, part), k);
    }
    else {
        return selectPivot(arr.slice(part+1), k - part  - 1);
    }

}

export default medianOfMedians;
//const pivot = medianOfMedians([1, 2, 3, 4, 5, 1000, 8, 9, 99], 5);
