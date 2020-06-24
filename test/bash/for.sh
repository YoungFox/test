#!/bin/bash


for((sum=0,i=1;i<=100;i++));do
	let sum+=i
done
echo $sum
