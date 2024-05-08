---
emoji: 🐍
title: Python | 2. 변수(variables)
date: '2024-02-15 00:00:00'
author: xininny
tags: Python variables 변수
categories: Python
---

컴퓨터는 사용하는 데이터를 주기억장치에 보관해서 사용한다.  
이 값을 CPU로 가져와서 사용하려면, 그 변수가 위치한 곳의 주소를 일일이 기억해야한다.  
그게 귀찮아서, 이름을 붙여서 사용하는데  
그것이 바로 **변수**다.@

<br>

## 변수

변수의 이름은 **기능/역할/의미**를 파악할 수 있도록 상세하게 만드는 것이 좋다.  
underscore(\_)를 통해서 변수의 이름을 만드는 것이 일반적이다.

```python
# 아래는 다양한 변수를 만들고, 원하는 값을 저장해서 사용

my_number = 100 # 정수형 변수
my_name   = "Kim" # 문자열 변수
my_height = 172.3 # 실수형 변수
is_middle_school = True # 불리언(boolean) 변수
```

<br>

변수에는 다양한 형태의 '값'들이 있다.

수학 시간에 사용하는 자연수, 정수, 실수, 허수들처럼 컴퓨터에서도 다양한 형태의 값들을 사용할 수 있다.  
이를 **자료형**(data types)이라고 한다.

```python
# 변수가 가지고 있는 값을 print() 함수로 출력할 수 있음
print(my_number)
print(my_name)
print(my_height)
print(is_middle_school)
```

```PowerShell
100
Kim
172.3
True
```

<br>

type( ) 함수는 파라미터로 주어지는 변수의 type(자료형)을 **반환**한다.
type( ) 함수는 파이썬 내장 함수이다.

```python
# 변수의 자료형은 type() 함수로 확인할 수 있음
print(type(my_number))
print(type(my_name))
print(type(my_height))
print(type(is_middle_school))
```

```PowerShell
<class 'int'>
<class 'str'>
<class 'float'>
<class 'bool'>
```

<br>

print와 type함수를 응용해서 print(type(my_number))를 만들 수 있다.  
이 문장은 type(my_number)라는 함수가 가장 먼저 실행된다.  
이 type( ) 함수는 파라미터의 자료형을 **반환**한다.  
print( ) 함수는 반환된 **그 값**을 출력한다.

```python
# 함수의 반환값을 아래와 같이 변수에 넣어서 사용 가능
a = type(my_name)
print(a)

print(type(my_name))
```

```PowerShell
<class 'str'>
<class 'str'>
```

<br>

그리고 변수는 당연히 **수정할 수 있다.**

```python
# 변수에 새로운 값을 넣으면 기존 값은 지워지고 새로운 값으로 대체됨

a = 10
print(a)

a = 20
print(a)

# Boolean 자료형은 True 또는 False 값만 저장할 수 있음
# True/ False의 첫 글자는 '대문자'라는 점에 유의(파이썬은 대문자와 소문자를 구별)
is_middle_school = False

print(is_middle_school)
```

```PowerShell
10
20
False
```

<br>

파이썬은 **동적 타입 바인딩**이라서 프로그램 실행 중에 변수의 자료형을 바꿀 수 있다.  
동적 타입 바인딩(dynamic type binding)은 파이썬에서 아주 중요한 개념이다.  
이 점이 C 언어와 같은 정적 타입 바인딩 언어와 큰 차이점이다.

```Python
# 변수에는 아무런 값이나 저장할 수 있음

a = 10
print(a)
print(type(a))

a = 10.1
print(a)
print(type(a))

a = "fasdfasfdsfsadfsdadsafsdafsdafsdafds"
print(a)
print(type(a))

# 변수에 값을 대입하고 이를 이용해서 수식 계산을 해보기

i = 10
j = 20

add = i + j # 덧셈 연산자
multiplication = i * j # 곱셈 연산자

print("add: ", add)
print("multi: ", multiplication)
```

```PowerShell
10
<class 'int'>
10.1
<class 'float'>
fasdfasfdsfsadfsdadsafsdafsdafsdafds
<class 'str'>
add:  30
multi:  200
```

<script src="https://utteranc.es/client.js"
        repo="xininny/xininny.github.io"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
