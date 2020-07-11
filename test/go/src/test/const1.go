package main

import "fmt"

func main() {
	const PATH string = "www.baidu.com"
	fmt.Println(PATH)

	const (
		C1 = 0
		C2 = 1
		C3 = 3
	)

	fmt.Println(C1, C2, C3)
}
