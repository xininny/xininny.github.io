---
emoji: 𝐏
title: Python | 13. if 조건문
date: '2024-02-26 00:00:00'
author: xininny
tags: Python String 문자열 연산
categories: Python
---

프로그래밍을 하다보면 변수 값을 비교하거나 체크할 필요가 있는 경우가 있다.  
이때 조건문을 사용한다.  
if 문이 대표적인 조건문이다.@

<br>

## 1. if 문

if문의 body는 **들여쓰기**를 해야한다.  
들여쓰기는 빈칸 4칸 또는 Tab 키를 사용한다.

```python
a = 10
b = 10
if a == b:
    print(a, "is same to",  b)
```

```powershell
10 is same to 10
```

<br>

## 2. if else 문

조건이 **True인 경우와 False인 경우 모두 해야하는 일이 있다**면 if else 문을 사용한다.

if문의 body에는 여러 줄을 적을 수도 있다.  
이를 **block**이라고 한다.  
이를 표시하기 위해서 들여쓰기를 하는 것이다.

```python
a = 10
b = 20

if a > b:
    print("max is", a)
    print('this is the body block of if')
else:
    print("max is", b)
    print('this is the body block of else')
```

```powershell
max is 20
this is the body block of else
```

<br>

## 3. if elif 문

조건을 **여러 개를 비교**해야하는 경우라면 elif문으로 여러 조건을 순차적으로 점검할 수 있다.

```python
a = 10
b = 10

if a > b:
    print("max is ", a)
    print("min is ", b)
elif a == b: # else if
    print("a is same to b")
else:
    print("max is ", b)
    print("max is ", a)
```

```powershell
a is same to b
```
