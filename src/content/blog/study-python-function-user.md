---
title: "Python | 15. 사용자 정의 함수"
description: "프로그램이 길어지면 관련있는 부분들을 함수로 나누어서 프로그래밍할 필요가 있다."
pubDate: 2024-02-28
updatedDate: 2024-11-27
tags: ["Python"]
category: "✏️ Study"
---
프로그램이 길어지면 관련있는 부분들을 함수로 나누어서 프로그래밍할 필요가 있다.

## **1. 특정한 일만 하는 함수**

```python
# 함수를 정의하는 형식
"""
def 함수명():
    함수 바디
"""
# 함수 정의
# 아래의 함수는 파라미터를 받지도 않고, 반환값도 없다.
def greet1():
    print('Hi')

# 함수 사용
greet1()
greet1()
```

```powershell
Hi
Hi
```

## **2. 함수의 결과값을 반환하는 함수**

```python
# 반환하는 값을 return 문장으로 적어주면 된다.

def greet2():
    return 'Hello'

print(greet2())

msg = greet2()
print(msg)

greet2()
```

```powershell
Hello
Hello
 'Hello'
```

## **3. 함수가 처리할 값을 파라미터로 전달받는 함수**

```python
def greet3(message):
    print(message)

greet3('Hi!')

def greet3_2(message):
    print("You said:", message)

greet3_2('Hi~~')
```

```powershell
Hi!
You said: Hi~~
```

## **4. 파라미터 값을 전달받고, 결과값을 반환하는 함수**

```python
def add(a, b):
    print('add function is called.')
    return a+b

c = add(1, 2)
print(c)

a = 2
b = 4
c = add(a, b)
print(c)
```

```powershell
add function is called.
3
add function is called.
6
```

## **5. 반환**

파이썬에서 모든 함수는 값을 반환(return)한다고 했다.

print( )함수는 None이라는 값을 반환한다.

C언어와 달라지는 파이썬 함수의 특성이 있다.

C언어는 함수를 정의(definition) 할 때 함수의 반환값이 있으면, 그 반환값의 자료형을 명시해야 한다.

하지만 파이썬은 다르다.

함수가 값을 반환할지 여부를 함수를 정의할 때 **동적 타입 바인딩**이기에 명시할 필요가 없다.

함수의 끝에 명시적인 return 문장이 없거나, return 문장만 있고,

실제로 반환하는 값이 없는 경우에는 **자동으로 None값을 반환**한다.

이로써 파이썬의 모든 함수는 값을 반환하도록 되어있다.

**파이썬의 함수는 모두 값을 반환한다.**

```python
def greet4():
    print('Hi')

def greet5():
    print('Hi')
    return

print(greet4())
print(greet5())
```

```powershell
Hi
None
Hi
None
```

**파이썬은 2개 이상의 값을 반환할 수도 있다.**

```python
def arithmetic_operation(a, b):
    return a+b, a-b, a*b, a/b

c = arithmetic_operation(1, 2)
print(type(c))
print(c)
print(c[0])
print(c[1])
```

```powershell
<class 'tuple'>
(3, -1, 2, 0.5)
3
-1
```
