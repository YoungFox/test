package main

import (
	"fmt"
	"time"
)

func main() {
	t1 := time.Now()
	fmt.Printf("%T\n", t1)

	time.Sleep(3 * time.Second)
	fmt.Printf("睡醒了")
}
