package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func main() {
	fileName1 := "/Users/bitmain/dev/git/test/test/go/src/fileinfo/fileinfo.go"
	fileName2 := "fileinfo.go"

	fmt.Println(filepath.IsAbs(fileName1))
	fmt.Println(filepath.IsAbs(fileName2))

	err := os.Mkdir("/Users/bitmain/dev/git/test/test/go/src/fileinfo/b", os.ModePerm)

	if err != nil {
		fmt.Println("err", err)
		return
	}

	fmt.Println("文件夹创建成功")
}
