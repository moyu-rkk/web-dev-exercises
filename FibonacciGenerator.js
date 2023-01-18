function fibonacciGenerator (n) {
    const lst = [0, 1];
    
    if (n > 2){
      for (var i = 2; i < n ; i++){
        lst[i] = lst[i-1] + lst[i-2];
      }
      return lst;
    }
    else if( n=== 2){
        return lst;
    }
    else if (n===1) {
        return [0];
    }
}

console.log(fibonacciGenerator(10))