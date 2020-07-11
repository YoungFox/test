package main

import "fmt"

func main() {
	a := 3
	b := 2
	c := 5

	res := a > b && c%a == b && a < (c/b)
	fmt.Println(c%a == b)
	fmt.Println(res)
}
