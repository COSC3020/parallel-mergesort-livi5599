self.onmessage = function(e) {
    let arr = e.data;
    let tmp = [];
    mergesort(arr, 0, arr.length - 1, tmp);
    self.postMessage(arr);
};

function msort(x, lo, hi, tmp) {
    if (lo >= hi) return;
    var mid = Math.floor((lo+hi)/2);
    msort(x, lo, mid, tmp);
    msort(x, mid+1, hi, tmp);
    merge(x, lo, mid, hi, tmp);
}

function merge(x, lo, mid, hi, tmp) {
    var a = lo, b = mid + 1;
    for (var k = lo; k <= hi; k++) {
        if (a <= mid && (b > hi || x[a] < x[b])) {
            tmp[k] = x[a++];
        } else {
            tmp[k] = x[b++];
        }
    }
    for (var k = lo; k <= hi; k++) {
        x[k] = tmp[k];
    }
}
