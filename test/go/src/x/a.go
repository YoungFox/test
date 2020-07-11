package x

import "fmt"

func A() {
	fmt.Println("这是测试包：x")
}

func init() {
	fmt.Println("A初始化。。。。。。")
}
