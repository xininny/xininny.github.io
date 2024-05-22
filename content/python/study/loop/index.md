---
emoji: 𝐏
title: Python | 14. 반복문
date: '2024-02-27 00:00:00'
author: xininny
tags: Python Loop for while 반복문
categories: Python
---

반복문은 어떤 작업들이 반복적으로 실행되도록 할 때 사용된다.@

<br>

## 1. while 반복문

파이썬은 조건부분의 결과값(불린값)이 True인지 False인지 체크한다.

조건부분이 **True**면, 파이썬은 반복문의 수행 부분을 실행한다.  
그리고 수행부분이 끝나면 다시 조건부분으로 돌아간다.  
조건부분이 **False**면, 파이썬은 while 반복문의 수행부분을 건너 뛰어 그 이후의 코드를 실행한다.

```python
i = 1
while i <= 5:
    print("Hello world!")
    i = i + 1
```

```powershell
Hello world!
Hello world!
Hello world!
Hello world!
Hello world!
```

<br>

## 2. for 반복문

while 반복문에 비해 for 반복문은 기능이 더 많다.

```python
# 문자열 변수 'alphabets"의 문자들을 순차적으로 출력하는 문장이다.
# for 반복문에서 이럴 때 조건 연산자 in을 사용하면 편하다.
alphabets = "abcdef"
for c in alphabets:
    print(c)

# alphabets라는 문자열(실제로는 향후에 리스트 등의 자료형을 배우게 되면 iterable 객체) 객체를
# 앞에서 부터 순차적으로 하나씩 c라는 변수에 담아서,
# for 반복문의 body에서 사용하라

# 한 줄로 출력하고 싶다면

for c in alphabets:
    print(c, end="")
```

```powershell
a
b
c
d
e
f
abcdef
```

<br>

len( )라는 함수는 파이썬에서 sequence 자료형(예: string, bytes, tuple, lsist, or range)  
또는 collection 자료형(예: dictionary, set or frozen set)와 같은 **객체들의 갯수를 반환**하는 함수다.

```python
print(len("abc"))
print(len("abc123"))
print(len(""))
```

```powershell
3
6
0
```

<br>

for문은 in 뒤에 범위를 지정해서 **지정된 범위만큼 반복 실행할 수도 있다.**

- for 변수 in 범위:  
  실행할 문장들  
  ...

이때 **범위를 지정하기 위해서 range( ) 함수를 사용**할 수 있다.  
range( ) 함수를 사용하면서 특정 범위 동안 반복문을 수행할 수도 있다.

```python
sum = 0

for x in range(11):
    sum += x

print(sum)


for x in range(1, 5):
    print(x)
```

```powershell
55
1
2
3
4
5
```

<br>

## 3. break

**while True:** 문장은 무한 반복(끝나지 않는 반복문)을 의미한다.  
그러므로 break문으로 **종료 조건을 체크**한다.

```python
total = 0
i = 1

while True:
   if i > 10:
       break
   total = total + i
   i = i + 1

print("sum from 1 to 10 is", total)
```

```powershell
sum from 1 to 10 is 55
```

<br>

## 4. continue

continue문장은 **for문에서 써보면 깔끔**하다.

```python
for ch in "HELLO PYTHON":
    if ch in "AEIOU":
        continue
    print(ch)
```

```powershell
H
L
L

P
Y
T
H
N

```

```toc

```
