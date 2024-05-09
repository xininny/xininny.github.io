---
emoji: 🐍
title: Python | 4. 연산자
date: '2024-02-17 00:00:00'
author: xininny
tags: Python 연산자
categories: Python
---

연산자에는 산술 연산자, 관계 연산자(비교 연산자), 논리 연산자, 대입 연산자가 있다.@

<br>

## 1. 산술 연산자

산술 연산자는 가장 기본적인 연산자다.  
대부분의 연산자는 일반적으로 수학에서 사용하는 심볼과 동일하다.  
일반 수학 연산처럼 왼쪽 연산자부터 계산하고 곱셈과 나눗셈이 있다면 먼저 계산한다.  
연산자는 괄호가 있다면 괄호 부분을 먼저 계산한다.  
즉, **괄호도 연산자다.** 괄호는 연산의 우선 순위를 결정해준다.

```python
print(3+4+5)
print(3+(4-5))
print(3+4-5)
print(3*(4+5))

```

```PowerShell
12
2
2
27
```

<br>

나눗셈은 실수, 정수, 나머지 연산자로 나뉜다.

- /는 **실수 나눗셈**이다. 실수 나눗셈이란 나눗셈의 결과가 **실수**로 나오는 것을 말한다.
- //는 **정수 나눗셈**이다. 나눗셈의 결과로 **정수값(몫)을** 반환한다.  
  나눗셈 연산 후 소수부분은 버리고 정수부분만 남겨둔다(floor division이라고 한다)
- %는 **나머지 연산자**다. 이름 그대로 **나머지**를 반환한다.

```python
print(10/3)
print(10//3)
print(10%3)
```

```PowerShell
3.3333333333333335
3
1
```

<br>

## 2. 관계 연산자(비교 연산자)

관계 연산자를 하기 전 boolean(불리언, 부울) 자료형을 설명하자면  
**boolean 자료형**은 **True 또는 False**를 값으로 가지는 자료형이다.
첫 글자가 **대문자**로 시작한다.

```python
a = True
print(a)
print(type(a))
b = False
print(b)
```

```PowerShell
True
<class 'bool'>
False
```

<br>

관계 연산자의 결과는 True 또는 False이다.  
관계를 검사한다는 의미이기에 관계를 만족하면 True, 그렇지 않으면 False가 된다.  
관계 연산자는 조건문과 반복문 등의 제어문에서 많이 사용한다.

```python
print(1 == 1) # 같은지
print(1 == 2)
print(1 != 1) # 다른지
print(1 != 2)
print(1 > 1) # 큰지
print(1 < 2) # 작은지
print(1 >= 1) # 크거나 같은지
print(1 >= 2)
print(1 <= 2) # 작거나 같은지
```

```PowerShell
True
False
False
True
False
True
True
False
True
```

<br>

## 3. 논리 연산자

논리 연산자는 **and, or, not**이 있다.  
논리 연산자의 **결과는 True 또는 False**이다.  
또한, 논리 연산자의 피연산자는 논리값이기에 논리 연산자라고 한다.

```python
print(True and False) # and 연산자는 피연산자 2개가 모두 True인 경우에 True
print(True and True)
print(True or False) # or 연산자는 피연산자 중 1개라도 True인 경우에 True
print(True or True)
print(False or False)
print(1==1 and 2==2)
print(1!=1 and 2==2)
print(1==1 and 2!=2)
print(1!=1 and 2!=2)
print(1==1 or 2==2)
print(1!=1 or 2==2)
print(1==1 or 2!=2)
print(1!=1 or 2!=2)
print(not 10 > 5) # not 연산자는 반대
```

```PowerShell
False
True
True
True
False
True
False
False
False
True
True
True
False
False
```

<br>

## 4. 대입 연산자

대입 연산자는 변수에 값을 대입한다.  
2개 이상의 변수에 동시에 대입이 가능하다.

```python
a = 10
print(a)

a, b = 10, 20
print(a,b)
```

```PowerShell
10
10 20
```

<br>

대입 연산자 이외에도 **복합 대입 연산자**가 있다.  
**+=, -=, \*=, /=, //=, %=, \*\*=** 들이 복합 대입 연산자다.  
예를 들어 += 연산자는 좌측의 변수값에 더해서 넣는다는 의미다.

```python
a = 10

a += 20
print(a)

a -= 10
print(a)

a *= 2
print(a)

a //= 2
print(a)

a %= 2
print(a)
```

```PowerShell
30
20
40
20
0
```

```toc

```
