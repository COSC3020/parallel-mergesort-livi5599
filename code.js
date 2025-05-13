var Parallel = require('paralleljs');

function parallelMs(arr, callback) {
    const thresh = 200;
    if (arr.length <= thresh) {
        //sequential processing
        let low = 0
        let high = arr.length-1;
        let tmp = [];
        msort(arr, low, high, tmp);
        callback(arr);
        return;
    }
    
    let left = [];
    let right = [];
    let mid = Math.floor(arr.length/2);
    console.log("mid = ", mid);
    for (let i = 0; i < mid; i++) {
        left.push(arr[i]);
    }
    for (let i = mid; i < arr.length; i++) {
        right.push(arr[i]);
    }
    console.log("left = ", left);
    console.log("right = ", right);

    let worker = new Worker('worker.js');

    worker.postMessage(right);

    let tmp = [];
    msort(left, 0, left.length - 1, tmp);

    worker.onmessage = function(e) {
        let sortedRight = e.data;
        let merged = [];
        merge(left, sortedRight, merged);
        callback(merged);
        worker.terminate();
    };
}

function merge(left, right, result) {
    let i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        result[k++] = left[i] < right[j] ? left[i++] : right[j++];
    }
    while (i < left.length) {
        result[k++] = left[i++];
    }
    while (j < right.length) {
        result[k++] = right[j++];
    }
}
