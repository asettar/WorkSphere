

var numberOfSubstrings = function(s) {
    const n = s.length;
    const totalSubstrings = Math.floor(n * (n + 1) / 2);
    let badSubstrings = 0;

    for (let i = 0; i < n; i++) {
        // once cnt0 * cnt0 > n - i, break
        let curZeroIdx = s[i] === '0' ? i : nxt[i];
        let cnt0 = 1;
        while (curZeroIdx < n && cnt0 * cnt0 <= n - i) {
            cnt++;
            curZeroIdx++;
        } 
    }

    return (totalSubstrings - badSubstrings);    
};

console.log(numberOfSubstrings("00011"));