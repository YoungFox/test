package main

import (
	"fmt"
	"io/ioutil"
)

func main() {
	fileName := "/Users/bitmain/dev/git/test/test/go/src/ioutil_test/x.txt"

	data, err := ioutil.ReadFile(fileName)
	if err == nil {
		fmt.Println("未出错")
	}
	fmt.Println(err)
	fmt.Println(data)
}
