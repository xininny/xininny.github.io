---
emoji: 𝐏
title: Python | 6. 자료형과 형 변환
date: '2024-02-19 00:00:00'
author: xininny
tags: Python 자료형 형변환
categories: Python
---

파이썬에서는 실용적이고 많은 자료형이 제공된다.@

<br>

## 1. 자료형

파이썬은 **동적 타입 바인딩** 언어이다.  
즉, 변수를 선언할 때 어떤 자료형의 값을 저장할 것이라고 미리 정해둘 필요가 없다.

```C
//C언어에서는 아래와 같이 해야한다.
int a;
a = 10;
```

```python
# 파이썬은 아래와 같이 하면 된다.
a = 1 # 이 대입 연산으로 인해서 변수 a는 정수형 변수
b = 1.0 # 이 대입 연산으로 인해서 변수 b는 실수형 변수
```

<br>

## 2. 형 변환

### 1) 자동 형 변환(묵시적 형 변환)

형 변환(type conversion)이 자동으로 일어나는 것을 자동 형 변환(implicit type conversion)이라고 한다.

```python
# 아래의 변수 add는 a+b에 의해 정수와 실수간의 덧셈으로 add 변수도 실수형 변수가 된다.
add = a + b
print(a)
print(b)
print(add)

print(type(a))
print(type(b))
print(type(add))
```

```PowerShell
1
1.0
2.0
<class 'int'>
<class 'float'>
<class 'float'>
```

<br>

### 2) 명시적 형 변환

프로그래머가 형변환을 명령하는 것을 명시적 형 변환(explicit type conversion, type casting)이라고 한다.

```python
# int 값으로 변환
# int() 함수는 파라미터를 정수로 변경한다.
print(int(10.1))

# 문자열 '123'도 int 형 123으로 변경한다.
print(int('123'))

# 문자열로 변환

a = str(123)
print(a)

b = a + ' '+ 'Python'
print(b)
```

```PowerShell
10
123
123
123 Python
```

```python
# 그렇지만 'abc' 문자열을 int 형으로 변경할 수 없다.
print(int('abc'))
```

```PowerShell
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
<ipython-input-3-d90c0eef9887> in <module>()
      1 # 그렇지만 'abc' 문자열을 int 형으로 변경할 수 없다.
----> 2 print(int('abc'))

ValueError: invalid literal for int() with base 10: 'abc'
```

<br>

자료형의 이름과 동일한 형변환 함수들이 있다.  
이는 클래스의 생성자(초기자)를 사용하는 것이다.  
따라서 int( ), float( ), str( ), bool( ) 등의 형변환 함수가 있다.

참고 사이트

- type conversion 함수 참고 사이트: <a href="https://intellipaat.com/blog/tutorial/python-tutorial/type-conversion-in-python/" target="_blank"> type conversion function</a>

```toc

```
